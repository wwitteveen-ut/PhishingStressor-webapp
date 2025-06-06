import ExperimentOverview from "@/researcher/components/ExperimentOverview";
import { Title, Container } from "@mantine/core";

export default function ExperimentOverviewPage() {
  return (
    <Container p="xl" flex={1}>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Overview
      </Title>
      <ExperimentOverview />
    </Container>
  );
}
