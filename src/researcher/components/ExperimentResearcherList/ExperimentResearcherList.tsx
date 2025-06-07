"use client";
import { ApiUser } from "@/researcher/store/types";
import {
  Group,
  Text,
  Box,
  Button,
  Stack,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { BookUser, Trash } from "lucide-react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { removeResearcherFromExperiment } from "@/researcher/actions/actions";
import AddResearcherModal from "../AddResearcherForm";

import { choice } from "../ExperimentForm/ExperimentForm";

interface ResearcherListProps {
  researcherChoices?: choice[];
}

export default function ExperimentResearcherList({
  researcherChoices = [],
}: ResearcherListProps) {
  const experiment = useExperimentContext();

  const handleDelete = async (researcherId: string) => {
    await removeResearcherFromExperiment(experiment.id, researcherId);
  };

  const openDeleteModal = (researcher: ApiUser) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      withCloseButton: false,
      radius: "xs",
      size: "md",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to remove <strong>{researcher.username}</strong>{" "}
          from the experiment?
          <br />
          (ID: {researcher.id})
        </Text>
      ),
      labels: { confirm: "Remove researcher", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDelete(researcher.id),
    });

  const header = (
    <Group justify="start" gap={"xs"}>
      <ThemeIcon variant="transparent">
        <BookUser />
      </ThemeIcon>
      <Text size="lg" c="gray.7" fw={600}>
        Researchers
      </Text>
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
      <Stack gap="xs">
        {experiment.researchers.map((researcher) => (
          <Paper
            key={researcher.id}
            bg={"gray.0"}
            p="xs"
            radius={"sm"}
            shadow="0"
            pl={"md"}
          >
            <Group justify="space-between">
              <Stack gap={0}>
                <Text size="sm" c="gray.6">
                  {researcher.id}
                </Text>
                <Text size="md" c="gray.9" fw={600}>
                  {researcher.username}
                </Text>
              </Stack>

              <Group gap="xs">
                <Button
                  variant="subtle"
                  size="sm"
                  color="red"
                  onClick={() => openDeleteModal(researcher)}
                  leftSection={<Trash size={14} />}
                >
                  Delete
                </Button>
              </Group>
            </Group>
          </Paper>
        ))}
        <AddResearcherModal researcherChoices={researcherChoices} />
      </Stack>
    </Stack>
  );
}
