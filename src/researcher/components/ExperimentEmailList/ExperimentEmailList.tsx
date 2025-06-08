"use client";
import { ResearcherEmail } from "@/researcher/store/types";
import { Table } from "@mantine/core";
import ExperimentEmailListItem from "../ExperimentEmailListItem";

interface ExperimentEmailListProps {
  emails: ResearcherEmail[];
}

export default function ExperimentEmailList({
  emails,
}: ExperimentEmailListProps) {
  return (
    <Table verticalSpacing="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Subject</Table.Th>
          <Table.Th>Sender</Table.Th>
          <Table.Th>Schedule</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {emails.map((email) => (
          <ExperimentEmailListItem key={email.id} email={email} />
        ))}
      </Table.Tbody>
    </Table>
  );
}
