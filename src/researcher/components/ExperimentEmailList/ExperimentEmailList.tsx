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
    <Table mt={0} striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Created At</Table.Th>
          <Table.Th>Subject</Table.Th>
          <Table.Th>Sender</Table.Th>
          <Table.Th>Attachments</Table.Th>
          <Table.Th>Schedule</Table.Th>
          <Table.Th>Groups</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {emails.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={9} style={{ textAlign: "center" }}>
              No emails found
            </Table.Td>
          </Table.Tr>
        ) : (
          emails.map((email) => (
            <ExperimentEmailListItem key={email.id} email={email} />
          ))
        )}
      </Table.Tbody>
    </Table>
  );
}
