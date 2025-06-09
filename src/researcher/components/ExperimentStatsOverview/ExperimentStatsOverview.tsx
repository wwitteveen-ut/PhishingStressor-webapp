"use client";

import { UserEvent, UserEventType } from "@/mail/store/types";
import { mockExperiments } from "@/mocks/data/experiments";
import { EmailStats, IGroup, ParticipantStats } from "@/researcher/store/types";
import { Button, Container, Group, Table, Title } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
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

  const [sortField, setSortField] =
    useState<keyof ParticipantStats>("loggedIn");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const stats: ExtendedParticipantStats[] = Array.from(
    experimentStats.entries()
  ).map(([participantId, participantStats]) => {
    const emails = participantStats.emails;
    const emailsOpened = Object.values(emails).filter((email: EmailStats) =>
      email.events.some(
        (event: UserEvent) => event.type === UserEventType.TIME_OPENED
      )
    ).length;
    const repliesSent = Object.values(emails).reduce(
      (sum, email) => sum + email.replies.length,
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
  });

  const handleSort = (field: keyof ParticipantStats) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        Experiment {mockExperiments[0].name} Statistics
      </Title>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Group gap={4}>
                Username
                {/* <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("username")}
                >
                  {sortField === "username" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button> */}
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Group
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("groupId")}
                >
                  {sortField === "groupId" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button>
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Emails Opened
                {/* <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("emailsOpened")}
                >
                  {sortField === "emailsOpened" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button> */}
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Replies Sent
                {/* <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("repliesSent")}
                >
                  {sortField === "repliesSent" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button> */}
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Clicks
                {/* <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("clicks")}
                >
                  {sortField === "clicks" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button> */}
              </Group>
            </Table.Th>
            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stats.map((stat) => (
            <Table.Tr key={stat.participantId}>
              <Table.Td>{stat.loggedIn.toLocaleDateString()}</Table.Td>
              <Table.Td>{stat.emailsOpened}</Table.Td>
              <Table.Td>{stat.repliesSent}</Table.Td>
              <Table.Td>{stat.group.name}</Table.Td>
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
    </Container>
  );
}
