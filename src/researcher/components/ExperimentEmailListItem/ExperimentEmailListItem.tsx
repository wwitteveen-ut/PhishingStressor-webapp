"use client";
import { Email } from '@/mail/store/types';
import { deleteEmail } from '@/researcher/actions/actions';
import { ResearcherEmail } from '@/researcher/store/types';
import { Badge, Group, Text, ActionIcon, Table, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Clock, AlertTriangle, Trash, Eye } from 'lucide-react';

interface ExperimentEmailListItemProps {
    email: ResearcherEmail;
}

export default function ExperimentEmailListItem({ email }: ExperimentEmailListItemProps) {
    const openDeleteModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        withCloseButton: false,
        radius: 'xs',
        size:'md',
        centered: true,
        children: (
        <Text size="sm">
            Are you sure you want to delete this email from experiment?<br/>
            (ID: {email.id})
        </Text>
        ),
        labels: { confirm: 'Delete email', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        onConfirm: () => handleDelete(),
    });
    
    const handleDelete = async () => {
        await deleteEmail(email.experimentId, email.id);
    }

    return (
        <Table.Tr>
            <Table.Td>
                <Text fw={500}>{email.title}</Text>
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
                            : `${email.scheduledFor} min after login`}
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
                
                <Tooltip label={"Preview email"}>
                <ActionIcon
                    variant="subtle"
                    onClick={openDeleteModal}
                >
                    <Eye size={20} />
                </ActionIcon>
                </Tooltip>
                <Tooltip label={"Delete email"}>
                <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={openDeleteModal}
                >
                    <Trash size={20} />
                </ActionIcon>
                </Tooltip>
            </Table.Td>
        </Table.Tr>
    );
}
