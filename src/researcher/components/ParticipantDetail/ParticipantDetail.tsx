"use client";

import { Button, Paper, Tabs, Text, Title } from "@mantine/core";
import { IconClock, IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailEventsTimeline from "../ExperimentEmailEventsTimeline/ExperimentEmailEventsTimeline";
import {
  EmailStats,
  ExperimentGlobalStats,
  GlobalStats,
} from "../ExperimentStatsCard/ExperimentStatsCard";
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
      <Tabs defaultValue="timeline" mt="md">
        <Tabs.List>
          <Tabs.Tab value="timeline" leftSection={<IconClock size={16} />}>
            Interaction Timeline
          </Tabs.Tab>
          <Tabs.Tab value="emails" leftSection={<IconMail size={16} />}>
            Email Details
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="timeline" pt="xs">
          {Object.entries(participantData.emails).map(
            ([emailId, emailData]) => {
              const email = experimentEmails[emailId];

              const emailEvents = emailData.events.map((event) => ({
                ...event,
                emailTitle: email.title,
                emailId,
              }));

              return (
                <ExperimentEmailEventsTimeline
                  key={emailId}
                  emailEvents={emailEvents}
                />
              );
            }
          )}
        </Tabs.Panel>
        <Tabs.Panel value="emails" pt="xs">
          <GlobalStats participantId={participantId} />
          <EmailStats
            participantId={participantId}
            emailId={Object.keys(participantData.emails)[0]}
          />
          <ExperimentGlobalStats />
          {Object.entries(participantData.emails).map(([emailId]) => (
            <Button
              component={Link}
              href={`/researcher/experiments/${experiment.id}/statistics/${participantId}/${emailId}`}
            >
              {emailId}
            </Button>
          ))}
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
