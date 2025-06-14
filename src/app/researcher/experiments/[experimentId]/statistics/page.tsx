import { Role } from "@/auth";
import { ExperimentStatsPage } from "@/researcher/components/ExperimentStatsPage";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";

export default async function ExperimentOverview() {
  await validateUserRoleAndGetSession(Role.RESEARCHER);

  return <ExperimentStatsPage />;
}
