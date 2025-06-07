import { Container, Paper } from "@mantine/core";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ExperimentEmailFormPage from "@/researcher/components/ExperimentEmailFormPage";

export default async function ExperimentsPage({}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <Container ml={0}>
      <Paper shadow="sm" p="lg" radius="md">
        <ExperimentEmailFormPage/>
      </Paper>
    </Container>
  );
}
