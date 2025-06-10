import { Role } from "@/auth";
import ExperimentStatsOverview from "@/researcher/components/ExperimentStatsOverview/ExperimentStatsOverview";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";

export default async function ExperimentOverview() {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  return <ExperimentStatsOverview />;
}
