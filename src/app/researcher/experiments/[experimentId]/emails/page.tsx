import { Group, Paper, Title } from "@mantine/core";
import { auth } from "@/auth";
import {
  getExperimentEmails,
} from "@/researcher/actions/actions";
import { redirect } from "next/navigation";
import ExperimentEmailList from "@/researcher/components/ExperimentEmailList";

export default async function ExperimentsPage({
  params,
}: {
  params: {
    experimentId: string;
  };
}) {
  const { experimentId } = await params;
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const emails = await getExperimentEmails(experimentId);
  return (
    <>
      <Group>
        <Title order={2} c="gray.9" mb="lg">
          Experiment Emails
        </Title>
      </Group>
      <Paper shadow="sm" p="lg" radius="md">
        <ExperimentEmailList emails={emails} />
      </Paper>
    </>
  );
}
