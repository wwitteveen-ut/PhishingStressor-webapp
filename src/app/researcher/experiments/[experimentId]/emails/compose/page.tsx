import { auth } from "@/auth";
import ExperimentEmailFormPage from "@/researcher/components/ExperimentEmailFormPage";
import { Container, Paper } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function ExperimentsPage({}) {
  const session = await auth();
  if (!session) {
    redirect("/login/researcher");
  }

  return (
    <Container ml={0}>
      <Paper shadow="sm" p="lg" radius="md">
        <ExperimentEmailFormPage />
      </Paper>
    </Container>
  );
}
