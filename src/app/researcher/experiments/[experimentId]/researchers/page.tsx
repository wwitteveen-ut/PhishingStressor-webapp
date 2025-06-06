"use client";

import { Container, Paper } from "@mantine/core";
import ExperimentResearcherList from "@/researcher/components/ExperimentResearcherList";

export default function ExperimentsPage() {

    return (
        <Container p="xl" flex={1}>
            <Paper shadow="sm" p="lg" radius="md">
                    <ExperimentResearcherList variant="edit"/>
            </Paper>
        </Container>
    );
}
