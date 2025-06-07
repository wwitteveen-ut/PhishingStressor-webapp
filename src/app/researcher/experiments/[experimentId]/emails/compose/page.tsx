import { Container, Group, Paper, Title } from "@mantine/core";
import { auth } from "@/auth";
import {
  getExperimentEmails,
} from "@/researcher/actions/actions";
import { redirect } from "next/navigation";
import ExperimentEmailForm from "@/researcher/components/ExperimentEmailForm";

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

  return (
    <Container ml={0}>
      <Paper shadow="sm" p="lg" radius="md">
        <ExperimentEmailForm/>
      </Paper>
    </Container>
  );
}
