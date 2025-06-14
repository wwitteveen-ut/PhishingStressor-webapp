import { Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  caption?: ReactNode;
}

export default function ExperimentStatsCard({
  title,
  icon,
  value,
  caption,
}: StatsCardProps) {
  return (
    <Paper withBorder shadow="none" p="md" radius="md">
      <Group justify="space-between">
        <Text
          size="xs"
          c="dimmed"
          style={{
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Text>
        <ThemeIcon variant="transparent" color="blue">
          {icon}
        </ThemeIcon>
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {value}
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        {caption || "Activity metric"}
      </Text>
    </Paper>
  );
}
