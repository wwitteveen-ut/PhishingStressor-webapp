import { getExperiment } from "@/researcher/actions/actions";
import { ExperimentProvider } from "@/researcher/components/ExperimentContext/ExperimentContext";
import ExperimentSidebar from "@/researcher/components/ExperimentSidebar";
import { Container } from "@mantine/core";
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
        <Container fluid w={"100%"} mx={"lg"} mt={"xl"}>
        {children}
        </Container>
      </ExperimentProvider>
  );
}
