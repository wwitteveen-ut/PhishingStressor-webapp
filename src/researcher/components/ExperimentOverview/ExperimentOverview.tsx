"use client";

import { useExperimentContext } from "@/researcher/components/ExperimentContext/ExperimentContext";
import { Text, Stack, TextInput, Group, Button, Paper } from "@mantine/core";
import Link from "next/link";
import ExperimentResearcherList from "../ExperimentResearcherList";
import { useState } from "react";

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
                <Text size="sm" c="gray.7" fw={500}>
                    Groups
                </Text>
                <Button variant="light" component={Link} href={ `${experiment.id}/groups`}>
                    Manage groups
                </Button>
            </Group>

            {experiment.groups.map((group) => (
              <Group
                key={group.id}
                p="sm"
                bg="gray.0"
                justify="space-between"
              >
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
            <ExperimentResearcherList/>
          </Stack>
        </Stack>
      </Paper>
    )
}