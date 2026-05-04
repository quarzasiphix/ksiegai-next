import { supabase } from "../supabase";

type BusinessProfileRow = {
  id: string;
  name: string;
  tax_id: string | null;
  city: string | null;
  entity_type: string | null;
  is_default: boolean | null;
  formation_mode?: string | null;
  company_stage?: string | null;
  access_role?: string | null;
};

type MembershipRow = {
  business_profile_id: string;
  role: string | null;
  business_profiles: BusinessProfileRow | null;
};

type UnreadInvoiceRow = {
  business_profile_id: string;
  received_at: string | null;
};

export interface HomeBusinessProfile {
  id: string;
  name: string;
  taxId: string | null;
  city: string | null;
  entityType: string | null;
  isDefault: boolean;
  formationMode: string | null;
  companyStage: string | null;
  accessRole: string | null;
}

export interface HomeBusinessInboxSummary {
  unreadCount: number;
  latestReceivedAt: string | null;
}

export interface HomeBusinessDashboardData {
  profiles: HomeBusinessProfile[];
  unreadByProfileId: Record<string, HomeBusinessInboxSummary>;
  totalUnread: number;
}

const normalizeProfile = (row: BusinessProfileRow): HomeBusinessProfile => ({
  id: row.id,
  name: row.name,
  taxId: row.tax_id ?? null,
  city: row.city ?? null,
  entityType: row.entity_type ?? null,
  isDefault: Boolean(row.is_default),
  formationMode: row.formation_mode ?? null,
  companyStage: row.company_stage ?? null,
  accessRole: row.access_role ?? null,
});

const sortProfiles = (profiles: HomeBusinessProfile[]) =>
  [...profiles].sort((left, right) => {
    if (left.isDefault !== right.isDefault) {
      return left.isDefault ? -1 : 1;
    }

    return left.name.localeCompare(right.name, "pl");
  });

export async function listAccessibleHomeBusinessProfiles(userId: string): Promise<HomeBusinessProfile[]> {
  const rpcResult = await (supabase.rpc as any)("list_accessible_business_profiles");
  const rpcProfiles = rpcResult.data as BusinessProfileRow[] | null;
  const rpcError = rpcResult.error as { code?: string; message?: string } | null;

  if (!rpcError && Array.isArray(rpcProfiles)) {
    return sortProfiles(rpcProfiles.map(normalizeProfile));
  }

  if (rpcError && rpcError.code !== "PGRST202") {
    console.error("[home/businessProfiles] list_accessible_business_profiles failed:", rpcError);
  }

  const [{ data: ownerProfiles, error: ownerError }, { data: memberships, error: membershipError }] =
    await Promise.all([
      supabase
        .from("business_profiles")
        .select("id,name,tax_id,city,entity_type,is_default,formation_mode,company_stage")
        .eq("user_id", userId)
        .order("name"),
      supabase
        .from("company_members")
        .select(
          "business_profile_id,role,business_profiles:business_profile_id(id,name,tax_id,city,entity_type,is_default,formation_mode,company_stage)",
        )
        .eq("user_id", userId),
    ]);

  if (ownerError) {
    throw ownerError;
  }

  if (membershipError) {
    throw membershipError;
  }

  const profilesById = new Map<string, HomeBusinessProfile>();

  for (const row of (ownerProfiles as BusinessProfileRow[] | null) || []) {
    profilesById.set(row.id, normalizeProfile(row));
  }

  for (const membership of (memberships as MembershipRow[] | null) || []) {
    if (!membership.business_profiles) continue;

    profilesById.set(membership.business_profiles.id, {
      ...normalizeProfile(membership.business_profiles),
      accessRole: membership.role ?? null,
    });
  }

  return sortProfiles(Array.from(profilesById.values()));
}

export async function getUnreadKsefInboxSummary(
  profileIds: string[],
): Promise<Record<string, HomeBusinessInboxSummary>> {
  if (profileIds.length === 0) {
    return {};
  }

  const { data, error } = await supabase
    .from("ksef_invoices_received")
    .select("business_profile_id,received_at")
    .in("business_profile_id", profileIds)
    .eq("processed", false)
    .order("received_at", { ascending: false });

  if (error) {
    console.error("[home/businessProfiles] unread KSeF summary failed:", error);
    return {};
  }

  const summary: Record<string, HomeBusinessInboxSummary> = {};

  for (const row of (data as UnreadInvoiceRow[] | null) || []) {
    const current = summary[row.business_profile_id];
    summary[row.business_profile_id] = {
      unreadCount: (current?.unreadCount ?? 0) + 1,
      latestReceivedAt: current?.latestReceivedAt ?? row.received_at ?? null,
    };
  }

  return summary;
}

export async function getHomeBusinessDashboardData(userId: string): Promise<HomeBusinessDashboardData> {
  const profiles = await listAccessibleHomeBusinessProfiles(userId);
  const unreadByProfileId = await getUnreadKsefInboxSummary(profiles.map((profile) => profile.id));
  const totalUnread = Object.values(unreadByProfileId).reduce(
    (sum, item) => sum + item.unreadCount,
    0,
  );

  return {
    profiles,
    unreadByProfileId,
    totalUnread,
  };
}
