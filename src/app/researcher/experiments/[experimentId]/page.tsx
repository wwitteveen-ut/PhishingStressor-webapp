import ExperimentOverview from "@/researcher/components/ExperimentOverview";
import { Title } from "@mantine/core";

export default function ExperimentOverviewPage() {
  return (
    <>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Overview
      </Title>
      <ExperimentOverview />
    </>
  );
}
