"use client";

import { useExperimentContext } from "@/researcher/components/ExperimentContext/ExperimentContext";
import { Group, Paper, Stack, Title } from "@mantine/core";

export default function ExperimentOverviewPage() {
    const experiment = useExperimentContext();
    return (
        <>
            <Stack justify="flex-start" mx={"xl"} flex={1} mt={"xl"}>
                <Group justify="space-between">
                    <Title order={2}>Experiment overview</Title>
                </Group>
                <Paper p={"md"}>
                    {experiment.id}
                </Paper>

            </Stack>
        </>
    );
}
