"use server";

import { getExperiments } from "@/researcher/actions/actions";
import ExperimentList from "@/researcher/components/ExperimentList";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { Container } from "@mantine/core";

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <>
      <ResearcherSidebar />
      <Container fluid w={"100%"} mx={"lg"} mt={"xl"}>
        <ExperimentList experiments={experiments} />
      </Container>
    </>
  );
}
