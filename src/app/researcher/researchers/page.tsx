"use server";

import { getResearchers } from "@/researcher/actions/actions";
import ResearcherList from "@/researcher/components/ResearcherTable";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { Container } from "@mantine/core";

export default async function ExperimentsPage() {
  const researchers = await getResearchers();

  return (
    <>
      <ResearcherSidebar />
      <Container fluid w={"100%"} mx={"lg"} mt={"xl"}>
        <ResearcherList researchers={researchers} />
      </Container>
    </>
  );
}
