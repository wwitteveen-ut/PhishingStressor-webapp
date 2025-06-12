"use client";
import { Paper, Tabs } from "@mantine/core";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext"; // Adjust import path as needed
import { ExperimentGlobalStats } from "../ExperimentStatsCard/ExperimentStatsCard"; // Adjust import path as needed
import { GroupStats } from "./GroupStats";

export function ExperimentStatsPage() {
  const experiment = useExperimentContext();
  const groups = experiment?.groups || [];

  return (
    <Paper p="lg" shadow="sm">
      <Tabs defaultValue="global">
        <Tabs.List>
          <Tabs.Tab value="global">Global Stats</Tabs.Tab>
          {groups.map((group) => (
            <Tabs.Tab key={group.id} value={group.id}>
              {group.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value="global" pt="xs">
          <ExperimentGlobalStats />
        </Tabs.Panel>
        {groups.map((group) => (
          <Tabs.Panel key={group.id} value={group.id} pt="xs">
            <GroupStats groupId={group.id} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  );
}
