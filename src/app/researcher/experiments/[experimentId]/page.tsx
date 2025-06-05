"use client";

import { useExperimentContext } from "@/researcher/components/ExperimentContext/ExperimentContext";
import { Card, Checkbox, Text, Stack, TextInput, Title, Group, Container, Button, Paper } from "@mantine/core";
import Link from "next/link";

export default function ExperimentOverviewPage() {
    const experiment = useExperimentContext();
    return (
    <Container p="xl" flex={1}>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Overview
      </Title>
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
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
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
                        <Group justify="space-between">
                <Text size="sm" c="gray.7" fw={500}>
                Researchers
                </Text>
                <Button variant="light" component={Link} href={ `${experiment.id}/researchers`}>
                    Manage researchers
                </Button>
            </Group>
            {experiment.researchers.map((researcher) => (
              <Group
                key={researcher.id}
                p="sm"
                bg="gray.0"
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
              >
                <Text size="sm" c="gray.9">
                  {researcher.username}
                </Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
