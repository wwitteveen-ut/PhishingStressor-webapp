"use client";

import { participants } from "@/mocks/data/accounts";
import { mockExperiments } from "@/mocks/data/experiments";
import { mockTrackingData } from "@/mocks/data/tracking";
import { Button, Container, Group, Table, Title } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const experimentId = mockExperiments[0].id;

interface ParticipantStats {
  participantId: string;
  username: string;
  groupId: string;
  emailsOpened: number;
  repliesSent: number;
  clicks: number;
}

export default function ExperimentOverview() {
  const [sortField, setSortField] =
    useState<keyof ParticipantStats>("username");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const stats: ParticipantStats[] = participants.map((participant) => {
    const participantData = mockTrackingData[experimentId]?.[participant.id];
    const emails = participantData?.emails || {};
    const emailsOpened = Object.values(emails).filter((email) =>
      email.events.some((event) => event.type === "TIME_OPENED")
    ).length;
    const repliesSent = Object.values(emails).reduce(
      (sum, email) => sum + email.replies.length,
      0
    );
    const clicks = Object.values(emails).reduce(
      (sum, email) =>
        sum + email.events.filter((event) => event.type === "CLICK").length,
      0
    );

    return {
      participantId: participant.id,
      username: participant.username,
      groupId: participantData?.groupId || "N/A",
      emailsOpened,
      repliesSent,
      clicks,
    };
  });

  const sortedStats = [...stats].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return sortDirection === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
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
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("username")}
                >
                  {sortField === "username" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button>
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
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("emailsOpened")}
                >
                  {sortField === "emailsOpened" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button>
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Replies Sent
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("repliesSent")}
                >
                  {sortField === "repliesSent" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button>
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Clicks
                <Button
                  variant="subtle"
                  size="xs"
                  onClick={() => handleSort("clicks")}
                >
                  {sortField === "clicks" && sortDirection === "asc" ? (
                    <IconSortAscending size={16} />
                  ) : (
                    <IconSortDescending size={16} />
                  )}
                </Button>
              </Group>
            </Table.Th>
            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedStats.map((stat) => (
            <Table.Tr key={stat.participantId}>
              <Table.Td>{stat.username}</Table.Td>
              <Table.Td>
                {mockExperiments[0].groups.find((g) => g.id === stat.groupId)
                  ?.name || "N/A"}
              </Table.Td>
              <Table.Td>{stat.emailsOpened}</Table.Td>
              <Table.Td>{stat.repliesSent}</Table.Td>
              <Table.Td>{stat.clicks}</Table.Td>
              <Table.Td>
                <Button
                  component={Link}
                  href={`/researcher/experiments/${experimentId}/statistics/${stat.participantId}`}
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
