"use client";
import { removeResearcherFromExperiment } from "@/researcher/actions/actions";
import { ApiUser } from "@/researcher/store/types";
import {
  Box,
  Button,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { BookUser, Trash } from "lucide-react";
import AddResearcherModal from "../AddResearcherForm";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";

import { useSession } from "next-auth/react";
import { choice } from "../ExperimentForm/ExperimentForm";

interface ResearcherListProps {
  researcherChoices?: choice[];
}

export default function ExperimentResearcherList({
  researcherChoices = [],
}: ResearcherListProps) {
  const { data: session, status } = useSession();
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

  if (status === "loading") {
    return (
      <Stack gap="sm">
        {header}
        <Stack gap="xs">
          {Array.from({ length: experiment.researchers?.length || 0 }).map(
            (_, i) => (
              <Paper
                key={i}
                bg={"gray.0"}
                p="xs"
                radius={"sm"}
                shadow="0"
                pl={"md"}
              >
                <Group justify="space-between">
                  <Stack gap={1}>
                    <Skeleton width={250} height={20} animate />

                    <Skeleton width={180} height={24} animate />
                  </Stack>
                </Group>
              </Paper>
            )
          )}
        </Stack>
      </Stack>
    );
  }

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
              {researcher.id !== session?.user.id && (
                <Group gap="xs">
                  <Button
                    variant="subtle"
                    size="sm"
                    color="red"
                    onClick={() => {
                      openDeleteModal(researcher);
                    }}
                    leftSection={<Trash size={14} />}
                  >
                    Delete
                  </Button>
                </Group>
              )}
            </Group>
          </Paper>
        ))}
        <AddResearcherModal researcherChoices={researcherChoices} />
      </Stack>
    </Stack>
  );
}
