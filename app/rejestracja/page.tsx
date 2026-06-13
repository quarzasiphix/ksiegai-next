import RegisterClient from "./RegisterClient";

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>
  | undefined;

function readFirstParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" && value.length > 0 ? value : null;
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: SearchParamsInput;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialInviteToken = readFirstParam(resolvedSearchParams?.invite);

  return <RegisterClient initialInviteToken={initialInviteToken} />;
}
