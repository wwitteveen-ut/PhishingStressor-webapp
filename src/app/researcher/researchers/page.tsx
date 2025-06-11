"use server";

import { Role } from "@/auth";
import { getResearchers } from "@/researcher/actions/actions";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import ResearcherList from "@/researcher/components/ResearcherTable";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Container, ScrollArea } from "@mantine/core";

export default async function ExperimentsPage() {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  const researchers = await getResearchers();

  return (
    <>
      <ResearcherSidebar />
      <Container fluid w={"100%"} m={0}>
        <ScrollArea h={"100%"}>
          <Container fluid py={"xl"}>
            <ResearcherList researchers={researchers} />
          </Container>
        </ScrollArea>
      </Container>
    </>
  );
}
