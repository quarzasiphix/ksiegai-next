import InviteRegistrationPage from "../../../components/invites/InviteRegistrationPage";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [];
}

export default function InviteTokenPage({ params }: { params: { token: string } }) {
  return <InviteRegistrationPage token={params.token} />;
}
