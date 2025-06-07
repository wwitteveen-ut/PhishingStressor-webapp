import { Experiment } from "@/researcher/store/types";
import ExperimentListItem from "../ExperimentListItem";
import { Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { ExperimentForm } from "../ExperimentForm";

export default function ExperimentList({
  experiments,
}: {
  experiments: Experiment[];
}) {
  return (
    <Stack justify="flex-start" flex={1}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>My Experiments</Title>
        <ExperimentForm />
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {experiments.map((experiment) => (
          <ExperimentListItem key={experiment.id} experiment={experiment} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
