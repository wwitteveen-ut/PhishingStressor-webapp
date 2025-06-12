"use client";
import { deleteEmail } from "@/researcher/actions/actions";
import { ResearcherEmail } from "@/researcher/store/types";
import { ActionIcon, Group, Table, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Trash } from "lucide-react";
import { EmailStatusBadge, GroupsBadge } from "../ExperimentBadges";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";

interface ExperimentEmailListItemProps {
  email: ResearcherEmail;
}

export default function ExperimentEmailListItem({
  email,
}: ExperimentEmailListItemProps) {
  const experiment = useExperimentContext();
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      withCloseButton: false,
      radius: "xs",
      size: "md",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this email from experiment?
          <br />
          (ID: {email.id})
        </Text>
      ),
      labels: { confirm: "Delete email", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDelete(),
    });

  const handleDelete = async () => {
    await deleteEmail(experiment.id, email.id);
  };

  return (
    <Table.Tr>
      <Table.Td>
        <Text fw={500}>{email.id}</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{new Date(email.createdAt).toLocaleString()}</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{email.title}</Text>
      </Table.Td>
      <Table.Td>
        <Text c="dimmed">{`${email.senderName} (${email.senderAddress})`}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Text c="dimmed">
            {email.scheduledFor === 0
              ? "Immediate"
              : `${email.scheduledFor} min after login`}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <GroupsBadge groups={email.groups} />
      </Table.Td>
      <Table.Td>
        <EmailStatusBadge isPhishing={email.isPhishing} />
      </Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        <Tooltip label={"Delete email"}>
          <ActionIcon color="red" variant="subtle" onClick={openDeleteModal}>
            <Trash size={20} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  );
}
