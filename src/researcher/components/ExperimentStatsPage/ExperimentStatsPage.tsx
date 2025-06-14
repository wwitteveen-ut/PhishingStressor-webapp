"use client";
import { getExperimentStats } from "@/researcher/actions/actions";
import { Button, Group, Paper, Tabs, Title } from "@mantine/core";
import { Download } from "lucide-react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentGlobalStats from "./ExperimentGlobalStats";
import GroupStats from "./GroupStats";

export default function ExperimentStatsPage() {
  const experiment = useExperimentContext();

  const handleDownload = async () => {
    const data = await getExperimentStats(experiment.id);
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${experiment.name}.json`;
    a.click();
  };

  return (
    <>
      <Group justify="space-between" align="center" mb="lg">
        <Title order={2} c="gray.9">
          Global Experiment Statistics
        </Title>
        <Button onClick={handleDownload} leftSection={<Download size={18} />}>
          Download experiment data
        </Button>
      </Group>
      <Paper p="lg" shadow="sm">
        <Tabs defaultValue="global">
          <Tabs.List>
            <Tabs.Tab value="global">Global Stats</Tabs.Tab>
            {experiment.groups.map((group) => (
              <Tabs.Tab key={group.id} value={group.id}>
                {group.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="global" pt="xs">
            <ExperimentGlobalStats />
          </Tabs.Panel>
          {experiment.groups.map((group) => (
            <Tabs.Panel key={group.id} value={group.id} pt="xs">
              <GroupStats groupId={group.id} />
            </Tabs.Panel>
          ))}
        </Tabs>
      </Paper>
    </>
  );
}
