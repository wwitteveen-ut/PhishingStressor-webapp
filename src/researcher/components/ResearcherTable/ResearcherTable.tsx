"use client";
import { ApiUser, Experiment } from "@/researcher/store/types";
import { ActionIcon, Group, Paper, SimpleGrid, Stack, Table, Title } from "@mantine/core";
import { ExperimentForm } from "../ExperimentForm";
import { TrashIcon } from "lucide-react";

export default function ResearcherList({researchers}:{researchers:ApiUser[]}){
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
              '--ai-hover-color': "red"
            }
          }}
          >
          <TrashIcon size={15}/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));  
  
  return (
      <Stack justify="flex-start" mx={"xl"} flex={1} mt={"xl"}>
        <Group justify="space-between" mb="lg">
          <Title order={2}>All researchers</Title>
          <ExperimentForm/>
        </Group>
          <Paper flex={1} p={"md"}>
          <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
        </Paper>

        </Stack>

    )
}