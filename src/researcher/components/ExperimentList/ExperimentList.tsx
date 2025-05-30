"use client";
import { Experiment } from "@/researcher/store/types";
import ExperimentListItem from "../ExperimentListItem";
import { Button, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import { PlusIcon } from "lucide-react";

export default function ExperimentList({experiments}:{experiments:Experiment[]}){
    return (
        <Stack justify="flex-start" mx={"xl"} flex={1} mt={"xl"}>
        <Group justify="space-between" mb="lg">
          <Title order={2}>My Experiments</Title>
          <Button
            leftSection={<PlusIcon size={16} />}
            color="blue"
          >
            New Experiment
          </Button>
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {experiments.map((experiment) => (
            <ExperimentListItem
              key={experiment.id}
              experiment={experiment}
            />
          ))}
        </SimpleGrid>
            </Stack>
    )
}