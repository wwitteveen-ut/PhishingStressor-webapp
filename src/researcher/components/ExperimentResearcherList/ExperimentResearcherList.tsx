import { ApiUser } from "@/researcher/store/types";
import { Group, Text, Box, Button, Stack, ScrollArea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";

interface ResearcherListProps {
  variant?: 'view' | 'edit';
}

export default function ExperimentResearcherList({ variant = "view" }: ResearcherListProps) {
  const experiment = useExperimentContext();

  const handleDelete = async () => {
    console.log('deleting the researcher');
  };

  const openDeleteModal = (researcher: ApiUser) => 
    modals.openConfirmModal({
      title: 'Please confirm your action',
      withCloseButton: false,
      radius: 'xs',
      size: 'md',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove <strong>{researcher.username}</strong> from the experiment?
          <br />
          (ID: {researcher.id})
        </Text>
      ),
      labels: { confirm: 'Remove researcher', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  const header = (
    <Group justify="space-between">
      <Text size="lg" c="gray.7" fw={600}>
        Researchers
      </Text>
      {variant === 'view' && (
        <Button variant="light" component={Link} href={`${experiment.id}/researchers`}>
          Manage researchers
        </Button>
      )}
    </Group>
  );

  if (!experiment.researchers?.length) {
    return (
      <>
        {header}
        <Box p="md" bg="gray.0">
          <Text c="gray.6">No researchers found</Text>
        </Box>
      </>
    );
  }

  return (
    <Stack gap="sm">
      {header}
      <ScrollArea>
        <Stack gap="xs">
          {experiment.researchers.map((researcher) => (
            <Group key={researcher.id} p="xs" bg="gray.0" justify="space-between">
              <Stack gap={0}>
                <Text size="xs" c="gray.6">
                  {researcher.id}
                </Text>
                <Text size="sm" c="gray.9" fw={600}>
                  {researcher.username}
                </Text>
              </Stack>

              {variant === 'edit' && (
                <Group gap="xs">
                  <Button
                    variant="subtle"
                    size="xs"
                    color="red"
                    onClick={() => openDeleteModal(researcher)}
                    leftSection={<Trash size={14} />}
                  >
                    Delete
                  </Button>
                </Group>
              )}
            </Group>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
