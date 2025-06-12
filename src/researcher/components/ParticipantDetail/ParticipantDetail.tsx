"use client";

import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { GlobalStats } from "../ExperimentStatsCard/ExperimentStatsCard";
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
    return <Text>Participant not found</Text>;
  }

  return (
    <Paper p="lg" shadow="md" radius={"sm"}>
      <Title order={2} mb="lg">
        Participant: {participantId}
      </Title>
      <GlobalStats participantId={participantId} />
      <Divider mb="lg" />
      <Container size="xs" ml="0">
        <Stack gap="xs">
          <Title order={3} mb="sm">
            All Emails statistics ({Object.keys(participantData.emails).length})
          </Title>
          {Object.entries(participantData.emails).map(([emailId]) => {
            const email = experimentEmails[emailId];
            return (
              <Paper key={emailId} withBorder p="xs" pl="0" shadow="none">
                <Button
                  component={Link}
                  variant="subtle"
                  fullWidth
                  href={`/researcher/experiments/${experiment.id}/statistics/participants/${participantId}/${emailId}`}
                  pl="0"
                >
                  <Stack gap={2} align="flex-start" justify="start">
                    <Text size="sm" fw={500}>
                      {email.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                      From: {email.senderName} ({email.senderAddress})
                    </Text>
                  </Stack>
                </Button>
              </Paper>
            );
          })}
        </Stack>
      </Container>
    </Paper>
  );
}
