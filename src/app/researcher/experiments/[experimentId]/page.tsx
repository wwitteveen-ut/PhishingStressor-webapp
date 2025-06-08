"use server";

import { auth } from "@/auth";
import ExperimentOverview from "@/researcher/components/ExperimentOverview";
import { Title } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function ExperimentOverviewPage() {
  const session = await auth();
  if (!session) {
    redirect("/login/researcher");
  }
  return (
    <>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Overview
      </Title>
      <ExperimentOverview />
    </>
  );
}
