import { Role } from "@/auth";
import ExperimentEmailFormPage from "@/researcher/components/ExperimentEmailFormPage";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Container, Paper } from "@mantine/core";

export default async function ExperimentsPage({}) {
  await validateUserRoleAndGetSession(Role.RESEARCHER);

  return (
    <Container ml={0}>
      <Paper shadow="sm" p="lg" radius="md">
        <ExperimentEmailFormPage />
      </Paper>
    </Container>
  );
}
