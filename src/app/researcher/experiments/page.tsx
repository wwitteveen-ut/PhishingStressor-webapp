"use server";

import { auth } from "@/auth";
import { getExperiments } from "@/researcher/actions/actions";
import ExperimentList from "@/researcher/components/ExperimentList";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { Container } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function ExperimentsPage() {
  const session = await auth();
  if (!session) {
    redirect("/login/researcher");
  }
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
