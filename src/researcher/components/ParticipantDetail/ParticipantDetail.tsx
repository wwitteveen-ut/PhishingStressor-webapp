"use client";

import {
  Button,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import {
  AttachmentsBadge,
  EmailStatusBadge,
  GroupsBadge,
} from "../ExperimentBadges";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { ParticipantGlobalStats } from "../ExperimentStats";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

export default function ParticipantDetail({
  participantId,
}: {
  participantId: string;
}) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const experiment = useExperimentContext();
  const participantData = experimentStats[participantId];

  if (!participantData) {
    return (
      <Paper p="md" shadow="sm" radius="md">
        <Text c="red.6" fw={500}>
          Participant not found
        </Text>
      </Paper>
    );
  }

  return (
    <Paper p="xl" shadow="md" radius="md" withBorder>
      <Stack gap="lg">
        <Group justify="flex-start" align="center">
          <Button
            variant="outline"
            leftSection={<IconChevronLeft size={16} />}
            color="gray"
            component={Link}
            href={`/researcher/experiments/${experiment.id}/statistics/participants`}
          >
            Participants
          </Button>
          <Title order={2}>Participant data: {participantId}</Title>
        </Group>
        <ParticipantGlobalStats participantId={participantId} />
        <Divider />
        <Stack gap="md">
          <Title order={3} style={{ fontSize: "1.2rem", color: "#1f2937" }}>
            Email Statistics
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {Object.entries(participantData.emails).map(([emailId]) => {
              const email = experimentEmails[emailId];
              return (
                <Button
                  key={emailId}
                  component={Link}
                  variant="outline"
                  href={`/researcher/experiments/${experiment.id}/statistics/participants/${participantId}/${emailId}`}
                  leftSection={<IconMail size={28} stroke={1.5} />}
                  h="100%"
                  py="xs"
                  ta="left"
                  color={email.isPhishing ? "red" : "blue"}
                  justify="flex-start"
                  pl="md"
                >
                  <Group w="100%" gap="sm" align="flex-start">
                    <Stack gap={2}>
                      <Text size="md" fw={600}>
                        {email.title}
                      </Text>
                      <Text size="sm" c="dimmed">
                        From: {email.senderName} ({email.senderAddress})
                      </Text>
                      <Text size="sm" c="dimmed">
                        Scheduled:{" "}
                        {email.scheduledFor === 0
                          ? "Immediate"
                          : `${email.scheduledFor} min after login`}
                      </Text>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                          Status:
                        </Text>
                        <EmailStatusBadge isPhishing={email.isPhishing} />
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">
                          Groups:
                        </Text>
                        <GroupsBadge groups={email.groups} />
                      </Group>
                      {email.attachments.length > 0 && (
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">
                            Attachments:
                          </Text>
                          <AttachmentsBadge attachments={email.attachments} />
                        </Group>
                      )}
                    </Stack>
                  </Group>
                </Button>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Paper>
  );
}
