import { getExperiment } from "@/researcher/actions/actions";
import { ExperimentProvider } from "@/researcher/components/ExperimentContext/ExperimentContext";
import ExperimentSidebar from "@/researcher/components/ExperimentSidebar";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ experimentId: string }>;
}) {
  const { experimentId } = await params;
  const experiment = await getExperiment(experimentId);

  return (
      <ExperimentProvider experiment={experiment}>
        <ExperimentSidebar/>
        {children}
      </ExperimentProvider>
  );
}
