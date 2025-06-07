"use client";
import { Table } from '@mantine/core';
import ExperimentEmailListItem from '../ExperimentEmailListItem';
import { Email } from '@/mail/store/types';
import { mockEmails } from '@/mocks/data/emails';


interface ExperimentEmailListProps {
  eemails?: Email[];
}

export default function ExperimentEmailList({  eemails }: ExperimentEmailListProps) {
    
    const emails: Email[] = mockEmails;

    return (
      <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Campaign Name</Table.Th>
              <Table.Th>Subject</Table.Th>
              <Table.Th>Sender</Table.Th>
              <Table.Th>Schedule</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {emails.map((email) => (
              <ExperimentEmailListItem
                key={email.id}
                email={email}
              />
            ))}
          </Table.Tbody>
        </Table>
  );
}