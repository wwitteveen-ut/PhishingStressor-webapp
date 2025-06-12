import { Role } from "@/auth";
import ParticipantEmailStatsOverview from "@/researcher/components/ParticipantEmailStatsOverview";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";

export default async function ExperimentsPage({
  params,
}: {
  params: Promise<{ participantId: string; emailId: string }>;
}) {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  const { participantId, emailId } = await params;
  return (
    <ParticipantEmailStatsOverview
      participantId={participantId}
      emailId={emailId}
    />
  );
}
