import { Role } from "@/auth";
import ParticipantDetail from "@/researcher/components/ParticipantDetail";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";

export default async function ExperimentsPage({
  params,
}: {
  params: Promise<{ participantId: string }>;
}) {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  const { participantId } = await params;
  return <ParticipantDetail participantId={participantId} />;
}
