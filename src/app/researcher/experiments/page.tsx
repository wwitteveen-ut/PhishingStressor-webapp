"use server";

import { Role } from "@/auth";
import { getExperiments } from "@/researcher/actions/actions";
import ExperimentList from "@/researcher/components/ExperimentList";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Container, ScrollArea } from "@mantine/core";

export default async function ExperimentsPage() {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  const experiments = await getExperiments();

  return (
    <>
      <ResearcherSidebar />
      <Container fluid w={"100%"} h={"100vh"}>
        <ScrollArea h={"100%"}>
          <Container fluid py={"xl"}>
            <ExperimentList experiments={experiments} />
          </Container>
        </ScrollArea>
      </Container>
    </>
  );
}
