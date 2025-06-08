"use client";

import { useExperimentContext } from "@/researcher/components/ExperimentContext/ExperimentContext";
import { ApiUser } from "@/researcher/store/types";
import {
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { choice } from "../ExperimentForm/ExperimentForm";
import ExperimentResearcherList from "../ExperimentResearcherList";

export default function ExperimentOverview({
  researchers,
}: {
  researchers: ApiUser[];
}) {
  const experiment = useExperimentContext();

  const researcherChoices: choice[] = researchers
    .map((r) => {
      if (experiment.researchers.some((researcher) => researcher.id === r.id)) {
        return undefined;
      }
      return {
        label: r.username,
        value: r.id,
      };
    })
    .filter((choice): choice is choice => choice !== undefined);

  return (
    <Paper shadow="sm" p="lg" radius="md">
      <Stack gap="md">
        <TextInput
          label="Experiment ID"
          name="name"
          value={experiment.id}
          readOnly
          size="sm"
        />
        <TextInput
          label="Experiment Name"
          name="name"
          value={experiment.name}
          readOnly
          size="sm"
        />
        <TextInput
          label="Duration (minutes)"
          name="name"
          value={experiment.duration}
          readOnly
          size="sm"
        />
        <Stack gap="sm">
          <Group justify="space-between">
            <Group justify="start" gap={"xs"}>
              <ThemeIcon variant="transparent">
                <IconUsersGroup />
              </ThemeIcon>
              <Text size="lg" c="gray.7" fw={600}>
                Groups
              </Text>
            </Group>
          </Group>

          {experiment.groups.map((group) => (
            <Group key={group.id} p="sm" bg="gray.0" justify="space-between">
              <Group gap="sm">
                <Text size="ms" c="gray.9">
                  {group.name}
                </Text>
                <Badge size="sm" color="gray.6">
                  Capacity: {group.capacity}
                </Badge>
              </Group>
            </Group>
          ))}
        </Stack>
        <Stack gap="sm">
          <ExperimentResearcherList researcherChoices={researcherChoices} />
        </Stack>
      </Stack>
    </Paper>
  );
}
