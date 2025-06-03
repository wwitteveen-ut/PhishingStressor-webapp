'use client';

import React from 'react';
import { 
  Paper, 
  Group, 
  Text, 
  Title, 
  Button, 
  ScrollArea, 
  Divider, 
  ThemeIcon,
  Flex
} from '@mantine/core';
import { 
  ArrowRightLeft, 
  LayoutDashboardIcon, 
  LucideIcon, 
  LogOut, 
  Users,
  SquareGanttChart,
  Mail,
  ChartArea,
  FlaskConical
} from 'lucide-react';
import LinksGroup from '@/shared/components/LinksGroup';
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  initiallyOpened?: boolean;
  mainLink?: string;
  links?: { label: string; link: string }[];
}

interface SidebarProps {
  experimentId?: string;
}

export default function ResearcherSidebar({ experimentId }: SidebarProps) {
  const pathname = usePathname();
  const experimentMenu: MenuItem = {
    label: 'Experiments',
    icon: FlaskConical,
    mainLink: "/researcher/experiments"
  };

  const researchersMenu: MenuItem = {
    label: 'Researchers',
    icon: Users,
    mainLink: "/researcher/researchers"
  };

  const mainMenu: MenuItem[] = [
    experimentMenu,
    researchersMenu,
  ];

  const mockdata: MenuItem[] = [
    {
      label: 'Overview',
      icon: SquareGanttChart,
      mainLink: `/researcher/experiments/${experimentId}`
    },
    { 
      label: 'Emails', 
      icon: Mail,
      mainLink: `/researcher/experiments/${experimentId}/emails`
    },
    { 
      label: 'Researchers', 
      icon: Users,
      mainLink: `/researcher/experiments/${experimentId}/researchers`
    },
    {
      label: 'Statistics',
      icon: ChartArea,
      initiallyOpened: true,
      links: [
        { label: 'First statistic', link: '/' },
        { label: 'Second statistic', link: '/' },
        { label: 'Third statistic', link: '/' },
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
    <Divider/>
    </>
  );

  const footerComponent = (
    <>
      <Divider />
      <div style={{ padding: '16px' }}>
        <Button
          variant="subtle"
          color="red"
          fullWidth
          leftSection={<LogOut size={16} />}
          onClick={() => signOut({
            redirectTo: "/login/researcher",
          })}
        >
          Sign out
        </Button>
      </div>
    </>
  );

  const menu = experimentId ? mockdata : mainMenu;

  return (
    <Paper 
      shadow="xs" 
      withBorder 
      style={{ width: 256, height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {headerComponent}
      {experimentId && (
        <>
          <Button 
            component={Link} 
            href={'/researcher/experiments'}
            fullWidth
            variant='subtle'
            radius={0}
            rightSection={<ArrowRightLeft size={14} />}
            h={60}
            py={10}
          >
            <Group>
              <Flex direction={"column"} align={"flex-start"}>
                <Text c="dimmed" size="xs">Current Experiment</Text>
                <Text size="sm" fw={600} c={"black.3"}>{experimentId}</Text>
              </Flex>
            </Group>
          </Button>
          <Divider />
        </>
      )}
      <ScrollArea style={{ flex: 1, padding: '8px' }}>
        {menu.map((item) => (
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