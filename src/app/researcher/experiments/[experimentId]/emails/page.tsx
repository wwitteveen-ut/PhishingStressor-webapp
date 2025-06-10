import { Role } from "@/auth";
import { getExperimentEmails } from "@/researcher/actions/actions";
import ExperimentEmailList from "@/researcher/components/ExperimentEmailList";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Button, Group, Paper, Title } from "@mantine/core";
import { MailPlus } from "lucide-react";
import Link from "next/link";

export default async function ExperimentsPage({
  params,
}: {
  params: Promise<{ experimentId: string }>;
}) {
  await validateUserRoleAndGetSession(Role.RESEARCHER);
  const { experimentId } = await params;

  const emails = await getExperimentEmails(experimentId);
  return (
    <>
      <Group justify="space-between" align="center" mb="lg">
        <Title order={2} c="gray.9">
          Experiment Emails
        </Title>
        <Button
          component={Link}
          href={`/researcher/experiments/${experimentId}/emails/compose`}
          leftSection={<MailPlus size={18} />}
        >
          Create new email
        </Button>
      </Group>
      <Paper shadow="sm" p="lg" radius="md">
        <ExperimentEmailList emails={emails} />
      </Paper>
    </>
  );
}
