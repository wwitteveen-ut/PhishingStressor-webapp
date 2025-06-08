"use client";

import { useExperimentContext } from "@/researcher/components/ExperimentContext/ExperimentContext";
import {
  Button,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import Link from "next/link";
import ExperimentResearcherList from "../ExperimentResearcherList";

export default function ExperimentOverview() {
  const experiment = useExperimentContext();

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
            <Button
              variant="light"
              component={Link}
              href={`${experiment.id}/groups`}
            >
              Manage groups
            </Button>
          </Group>

          {experiment.groups.map((group) => (
            <Group key={group.id} p="sm" bg="gray.0" justify="space-between">
              <Group gap="xs">
                <Text size="sm" c="gray.9">
                  {group.name}
                </Text>
                <Text size="xs" c="gray.5">
                  (Capacity: {group.capacity})
                </Text>
              </Group>
            </Group>
          ))}
        </Stack>
        <Stack gap="sm">
          <ExperimentResearcherList />
        </Stack>
      </Stack>
    </Paper>
  );
}
