"use client";

import { Button, Paper, Text, Title } from "@mantine/core";
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

      {Object.entries(participantData.emails).map(([emailId]) => (
        <Button
          component={Link}
          href={`/researcher/experiments/${experiment.id}/statistics/participants/${participantId}/${emailId}`}
        >
          {emailId}
        </Button>
      ))}
    </Paper>
  );
}
