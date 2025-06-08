"use client";

import LinksGroup from "@/shared/components/LinksGroup";
import {
  Button,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { TablerIcon } from "@tabler/icons-react";
import {
  ArrowRightLeft,
  ChartArea,
  LayoutDashboardIcon,
  LogOut,
  LucideIcon,
  Mail,
  SquareGanttChart,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";

interface MenuItem {
  label: string;
  icon: LucideIcon | TablerIcon;
  initiallyOpened?: boolean;
  mainLink?: string;
  links?: { label: string; link: string }[];
}

export default function ExperimentSidebar() {
  const pathname = usePathname();
  const experiment = useExperimentContext();

  const mockdata: MenuItem[] = [
    {
      label: "Overview",
      icon: SquareGanttChart,
      mainLink: `/researcher/experiments/${experiment.id}`,
    },
    {
      label: "Emails",
      icon: Mail,
      mainLink: `/researcher/experiments/${experiment.id}/emails`,
    },
    {
      label: "Statistics",
      icon: ChartArea,
      initiallyOpened: true,
      links: [
        {
          label: "Overview",
          link: `/researcher/experiments/${experiment.id}/statistics`,
        },
        { label: "Second statistic", link: "/" },
        { label: "Third statistic", link: "/" },
      ],
    },
  ];

  const headerComponent = (
    <>
      <Group p="md" gap="xs">
        <ThemeIcon variant="white">
          <LayoutDashboardIcon size={24} />
        </ThemeIcon>
        <Title order={6}>PhishingStressor Dashboard</Title>
      </Group>
      <Divider />
    </>
  );

  const footerComponent = (
    <>
      <Divider />
      <div style={{ padding: "16px" }}>
        <Button
          variant="subtle"
          color="red"
          fullWidth
          leftSection={<LogOut size={16} />}
          onClick={() =>
            signOut({
              redirectTo: "/login/researcher",
            })
          }
        >
          Sign out
        </Button>
      </div>
    </>
  );

  return (
    <Paper
      shadow="xs"
      withBorder
      style={{
        minWidth: 256,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {headerComponent}
      <Button
        component={Link}
        href={"/researcher/experiments"}
        fullWidth
        variant="subtle"
        radius={0}
        rightSection={<ArrowRightLeft size={14} />}
        justify="space-between"
        ta={"left"}
        h={60}
        py={10}
      >
        <Stack gap={0} flex={1}>
          <Text c="dimmed" size="sm">
            Current Experiment
          </Text>
          <Text size="md" fw={600}>
            {experiment.name}
          </Text>
        </Stack>
      </Button>
      <Divider />
      <ScrollArea style={{ flex: 1, padding: "8px" }}>
        {mockdata.map((item) => (
          <LinksGroup
            key={item.label}
            icon={item.icon}
            label={item.label}
            initiallyOpened={item.initiallyOpened}
            active={pathname === item.mainLink}
            mainLink={item.mainLink}
            links={item.links}
          />
        ))}
      </ScrollArea>
      {footerComponent}
    </Paper>
  );
}
