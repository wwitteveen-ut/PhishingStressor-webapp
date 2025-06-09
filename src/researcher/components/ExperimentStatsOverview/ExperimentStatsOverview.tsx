"use client";

import { UserEvent, UserEventType } from "@/mail/store/types";
import { EmailStats, IGroup, ParticipantStats } from "@/researcher/store/types";
import { Button, Group, Paper, Table, Title } from "@mantine/core";
import Link from "next/link";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentContext";

interface ExtendedParticipantStats extends Omit<ParticipantStats, "groupId"> {
  participantId: string;
  emailsOpened: number;
  repliesSent: number;
  group: IGroup;
}

export default function ExperimentStatsOverview() {
  const experiment = useExperimentContext();
  const experimentStats = useExperimentStatsContext();
  console.log(experimentStats);
  // const [sortField, setSortField] =
  //   useState<keyof ParticipantStats>("loggedIn");
  // const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const stats: ExtendedParticipantStats[] = Object.entries(experimentStats).map(
    ([participantId, participantStats]) => {
      const emails = participantStats.emails;
      const emailsOpened = Object.values(emails).filter((email) =>
        (email as EmailStats).events.some(
          (event: UserEvent) => event.type === UserEventType.TIME_OPENED
        )
      ).length;
      const repliesSent = Object.values(emails).reduce(
        (sum, email) => sum + (email as EmailStats).replies.length,
        0
      );
      const group = experiment.groups.find(
        (g) => g.id === participantStats.groupId
      ) as IGroup;

      return {
        participantId,
        group: group,
        emailsOpened,
        repliesSent,
        loggedIn: participantStats.loggedIn,
        emails: participantStats.emails,
      };
    }
  );

  // const handleSort = (field: keyof ParticipantStats) => {
  //   if (field === sortField) {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortDirection("asc");
  //   }
  // };

  return (
    <Paper p="xl" shadow="md">
      <Title order={2} mb="lg">
        Experiment {experiment.name} Statistics
      </Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Group gap={4}>Participant</Group>
            </Table.Th>
            <Table.Th>Logged In At</Table.Th>
            <Table.Th>Group</Table.Th>

            <Table.Th>
              <Group gap={4}>Emails Opened</Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>Replies Sent</Group>
            </Table.Th>
            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stats.map((stat) => (
            <Table.Tr key={stat.participantId}>
              <Table.Td>{stat.participantId}</Table.Td>
              <Table.Td>
                {new Date(stat.loggedIn).toLocaleDateString()}
                {new Date(stat.loggedIn).toLocaleTimeString()}
              </Table.Td>
              <Table.Td>{stat.group.name}</Table.Td>
              <Table.Td>{stat.emailsOpened}</Table.Td>
              <Table.Td>{stat.repliesSent}</Table.Td>
              <Table.Td>
                <Button
                  component={Link}
                  href={`/researcher/experiments/${experiment.id}/statistics/${stat.participantId}`}
                  variant="outline"
                  size="xs"
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
