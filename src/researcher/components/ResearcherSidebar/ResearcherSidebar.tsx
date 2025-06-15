"use client";
import LinksGroup from "@/shared/components/LinksGroup";
import {
  Box,
  Button,
  Divider,
  Flex,
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

export interface MenuItem {
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

  return (
    <Paper shadow="xs" withBorder miw={256} h="100vh">
      <Flex direction="column" h="100%">
        <ResearcherSidebarHeader />
        <ScrollArea flex={1} p="8px">
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
        <ResearcherSidebarFooter />
      </Flex>
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
            DASHBOARD
          </Title>
        </Stack>
      </Group>
      <Divider />
    </>
  );
}

export function ResearcherSidebarFooter() {
  return (
    <Box>
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
    </Box>
  );
}
