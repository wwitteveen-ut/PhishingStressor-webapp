"use client";

import LinksGroup from "@/shared/components/LinksGroup";
import {
  Button,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  FlaskConical,
  LayoutDashboardIcon,
  LogOut,
  LucideIcon,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  initiallyOpened?: boolean;
  mainLink?: string;
  links?: { label: string; link: string }[];
}

export default function ResearcherSidebar() {
  const pathname = usePathname();

  const mainMenu: MenuItem[] = [
    {
      label: "Experiments",
      icon: FlaskConical,
      mainLink: "/researcher/experiments",
    },
    {
      label: "Researchers",
      icon: Users,
      mainLink: "/researcher/researchers",
    },
  ];

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
      <ResearcherSidebarHeader />
      <ScrollArea style={{ flex: 1, padding: "8px" }}>
        {mainMenu.map((item) => (
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

export function ResearcherSidebarHeader() {
  return (
    <>
      <Group p="md" gap="xs">
        <ThemeIcon variant="white" size={45}>
          <LayoutDashboardIcon size={45} />
        </ThemeIcon>
        <Stack gap={0}>
          <Title order={4}>PhishingStressor</Title>
          <Title order={4} c={"blue.6"}>
            Dashboard
          </Title>
        </Stack>
      </Group>
      <Divider />
    </>
  );
}
