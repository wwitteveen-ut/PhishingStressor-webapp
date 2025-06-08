"use server";

import { auth } from "@/auth";
import { getResearchers } from "@/researcher/actions/actions";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import ResearcherList from "@/researcher/components/ResearcherTable";
import { Container } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function ExperimentsPage() {
  const session = await auth();
  if (!session) {
    redirect("/login/researcher");
  }
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
