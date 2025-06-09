import { getExperimentStats } from "@/researcher/actions/actions";
import { ExperimentStatsProvider } from "@/researcher/components/ExperimentStatsContext/ExperimentContext";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ experimentId: string }>;
}) {
  const { experimentId } = await params;
  const experimentStats = await getExperimentStats(experimentId);

  return (
    <ExperimentStatsProvider experimentStats={experimentStats}>
      {children}
    </ExperimentStatsProvider>
  );
}
