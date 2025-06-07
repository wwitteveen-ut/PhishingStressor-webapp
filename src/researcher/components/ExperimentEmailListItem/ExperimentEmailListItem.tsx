"use client";
import { Email } from '@/mail/store/types';
import { Badge, Group, Text, ActionIcon, Table } from '@mantine/core';
import { Clock, AlertTriangle, Trash } from 'lucide-react';

interface ExperimentEmailListItemProps {
    email: Email;
}

export default function ExperimentEmailListItem({ email }: ExperimentEmailListItemProps) {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this campaign?')) {
        //   onDelete(campaign.id);
        }
    };

    return (
        <Table.Tr>
            <Table.Td>
                <Text fw={500}>{email.senderName}</Text>
            </Table.Td>
            <Table.Td>
                <Text c="dimmed">{email.title}</Text>
            </Table.Td>
            <Table.Td>
                <Text c="dimmed">{`${email.senderName} (${email.senderAddress})`}</Text>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <Clock size={16} />
                    <Text c="dimmed">
                        {email.scheduledFor === 0
                            ? 'Immediate'
                            : `${email.scheduledFor} minutes after login`}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={email.isPhishing ? 'red' : 'green'}
                    variant="light"
                    leftSection={<AlertTriangle size={12} />}
                >
                    {email.isPhishing ? 'Phishing' : 'Regular'}
                </Badge>
            </Table.Td>
            <Table.Td style={{ textAlign: 'right' }}>
                <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={handleDelete}
                >
                    <Trash size={20} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    );
}
