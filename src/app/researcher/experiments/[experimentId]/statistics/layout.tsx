import {
  getExperimentEmails,
  getExperimentStats,
} from "@/researcher/actions/actions";
import { ExperimentStatsProvider } from "@/researcher/components/ExperimentStatsContext/ExperimentStatsContext";
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
  const experimentEmails = await getExperimentEmails(experimentId);
  return (
    <ExperimentStatsProvider
      experimentStats={experimentStats}
      experimentEmails={experimentEmails}
    >
      {children}
    </ExperimentStatsProvider>
  );
}
