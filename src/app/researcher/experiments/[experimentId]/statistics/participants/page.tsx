import { Role } from "@/auth";
import ExperimentParticipantStatsOverview from "@/researcher/components/ExperimentParticipantsStatsTable/ExperimentParticipantsStatsTable";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Title } from "@mantine/core";

export default async function ExperimentOverview() {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  return (
    <>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Participants Statistics
      </Title>
      <ExperimentParticipantStatsOverview />
    </>
  );
}
