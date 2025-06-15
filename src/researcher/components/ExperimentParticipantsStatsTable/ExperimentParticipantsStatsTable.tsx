"use client";

import { IGroup, ParticipantStats } from "@/researcher/store/types";
import { Button, Paper, Table } from "@mantine/core";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

interface ExtendedParticipantStats extends Omit<ParticipantStats, "groupId"> {
  participantId: string;
  group: IGroup;
}

export default function ExperimentParticipantsStatsTable() {
  const experiment = useExperimentContext();
  const { experimentStats } = useExperimentStatsContext();

  const stats: ExtendedParticipantStats[] = Object.entries(experimentStats).map(
    ([participantId, participantStats]) => {
      const group = experiment.groups.find(
        (g) => g.id === participantStats.groupId
      ) as IGroup;

      return {
        participantId,
        group: group,
        loggedIn: participantStats.loggedIn,
        emails: participantStats.emails,
      };
    }
  );

  return (
    <Paper p="lg" shadow="xs" radius="sm" withBorder>
      <Table striped withRowBorders={true} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Participant ID</Table.Th>
            <Table.Th>Logged In At</Table.Th>
            <Table.Th>Group</Table.Th>
            <Table.Th ta="right">Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stats.map((stat) => (
            <Table.Tr key={stat.participantId}>
              <Table.Td>{stat.participantId}</Table.Td>
              <Table.Td>
                {new Date(stat.loggedIn).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                {", "}
                {new Date(stat.loggedIn).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Table.Td>
              <Table.Td>{stat.group.name}</Table.Td>
              <Table.Td ta="right">
                <Button
                  component={Link}
                  href={`/researcher/experiments/${experiment.id}/statistics/participants/${stat.participantId}`}
                  variant="light"
                  size="xs"
                  leftSection={<Eye size={16} />}
                >
                  View Details
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
