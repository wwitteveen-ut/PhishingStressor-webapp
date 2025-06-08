import { getExperiment } from "@/researcher/actions/actions";
import { ExperimentProvider } from "@/researcher/components/ExperimentContext/ExperimentContext";
import ExperimentSidebar from "@/researcher/components/ExperimentSidebar";
import { Container, ScrollArea } from "@mantine/core";
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
      <ExperimentSidebar />
      <Container fluid w={"100%"} h={"100vh"}>
        <ScrollArea h={"100%"}>
          <Container fluid py={"xl"}>
            {children}
          </Container>
        </ScrollArea>
      </Container>
    </ExperimentProvider>
  );
}
