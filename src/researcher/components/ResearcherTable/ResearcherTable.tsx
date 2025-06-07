"use client";
import { ApiUser } from "@/researcher/store/types";
import { ActionIcon, Container, Paper, Table, Title } from "@mantine/core";
import { TrashIcon } from "lucide-react";

export default function ResearcherTable({
  researchers,
}: {
  researchers: ApiUser[];
}) {
  const rows = researchers.map((researcher) => (
    <Table.Tr key={researcher.id}>
      <Table.Td>{researcher.id}</Table.Td>
      <Table.Td>{researcher.username}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="transparent"
          color="gray"
          styles={{
            root: {
              "--ai-hover-color": "red",
            },
          }}
        >
          <TrashIcon size={15} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container p="xl" flex={1}>
      <Title order={2} c="gray.9" mb="lg">
        All researchers
      </Title>
      <Paper shadow="sm" p="lg" radius="md">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}
