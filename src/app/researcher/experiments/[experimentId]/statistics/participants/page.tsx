import { Role } from "@/auth";
import ExperimentStatsOverview from "@/researcher/components/ExperimentStatsOverview/ExperimentStatsOverview";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Title } from "@mantine/core";

export default async function ExperimentOverview() {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  return (
    <>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Statistics
      </Title>
      <ExperimentStatsOverview />
    </>
  );
}
