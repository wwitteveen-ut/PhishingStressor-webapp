"use client";
import { deleteExperiment } from "@/researcher/actions/actions";
import { Experiment } from "@/researcher/store/types";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Stack,
  Group,
  Text,
} from "@mantine/core";
import { TrashIcon } from "lucide-react";
import { modals } from "@mantine/modals";

import Link from "next/link";

export default function ExperimentListItem({
  experiment,
}: {
  experiment: Experiment;
}) {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      withCloseButton: false,
      radius: "xs",
      size: "md",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete experiment{" "}
          <strong>{experiment.name}</strong>?<br />
          (ID: {experiment.id})
        </Text>
      ),
      labels: { confirm: "Delete experiment", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDelete(),
    });

  const handleDelete = async () => {
    await deleteExperiment(experiment.id);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="hover:shadow-md transition-shadow duration-200"
    >
      <Group justify="space-between" mb="md">
        <Text fw={500} size="lg" truncate>
          {experiment.name}
        </Text>
        <Badge color="blue">{experiment.duration} days</Badge>
      </Group>
      <Stack gap="md">
        <div>
          <Text size="sm" c="dimmed" fw={500} mb="xs">
            Groups
          </Text>
          <Group gap="xs">
            {experiment.groups.map((group) => (
              <Badge key={group.id} fw={600} color="gray" variant="light">
                {group.name} ({group.capacity})
              </Badge>
            ))}
          </Group>
        </div>
        <div>
          <Text size="sm" c="dimmed" fw={500} mb="xs">
            Team
          </Text>
          <Group gap="xs">
            {experiment.researchers.map((researcher) => (
              <Badge key={researcher.id} fw={600} color="blue" variant="light">
                {researcher.username}
              </Badge>
            ))}
          </Group>
        </div>
      </Stack>
      <Group justify="flex-end" mt="md">
        <ActionIcon color="red" variant="subtle" onClick={openDeleteModal}>
          <TrashIcon size={20} />
        </ActionIcon>
        <Button
          variant="light"
          color="blue"
          size="sm"
          component={Link}
          href={`/researcher/experiments/${experiment.id}`}
        >
          View Dashboard
        </Button>
      </Group>
    </Card>
  );
}
