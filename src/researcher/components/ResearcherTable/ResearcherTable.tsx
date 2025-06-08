"use client";

import { ApiUser } from "@/researcher/store/types";
import { Paper, Stack, Table, Title } from "@mantine/core";

export default function ResearcherTable({
  researchers,
}: {
  researchers: ApiUser[];
}) {
  const rows = researchers.map((researcher) => (
    <Table.Tr key={researcher.id}>
      <Table.Td>{researcher.id}</Table.Td>
      <Table.Td>{researcher.username}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack justify="flex-start" flex={1}>
      <Title order={2} mb="lg">
        All researchers
      </Title>
      <Paper shadow="sm" p="lg" radius="md" mah={"90vh"}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Username</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
