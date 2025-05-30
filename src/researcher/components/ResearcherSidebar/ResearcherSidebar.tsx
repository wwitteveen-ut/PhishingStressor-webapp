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
  UnstyledButton,
  Stack,
  Flex
} from '@mantine/core';
import { 
  ArrowLeft, 
  ArrowRightLeft, 
  CalendarCheck, 
  CircuitBoard, 
  FileBarChart, 
  LineChart, 
  Lock, 
  Settings, 
  LayoutDashboardIcon, 
  LucideIcon, 
  LogOut 
} from 'lucide-react';
import LinksGroup from '@/shared/components/LinksGroup';
import { signOut } from "next-auth/react";
import Link from 'next/link';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  links?: { label: string; link: string }[];
}

interface SidebarProps {
  experimentId?: string;
}

export default function ResearcherSidebar({ experimentId }: SidebarProps) {
  const experimentMenu = {
    label: 'Experiments',
    icon: CircuitBoard,
  };

  const mockdata: MenuItem[] = [
    {
      label: 'Releases',
      icon: CalendarCheck,
      links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
      ],
    },
    { label: 'Analytics', icon: LineChart },
    { label: 'Contracts', icon: FileBarChart },
    { label: 'Settings', icon: Settings },
    {
      label: 'Security',
      icon: Lock,
      links: [
        { label: 'Enable 2FA', link: '/' },
        { label: 'Change password', link: '/' },
        { label: 'Recovery codes', link: '/' },
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

  if (!experimentId) {
    return (
      <Paper 
        shadow="xs" 
        radius={0}
        style={{ width: 256, height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
      {headerComponent}

        <div style={{ flex: 1, padding: '8px' }}>
          <LinksGroup
            icon={experimentMenu.icon}
            label={experimentMenu.label}
            initiallyOpened={false}
          />
        </div>
        {footerComponent}
      </Paper>
    );
  }

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
      <ScrollArea style={{ flex: 1, padding: '16px' }}>
        {mockdata.map((item) => (
          <LinksGroup
            key={item.label}
            icon={item.icon}
            label={item.label}
            initiallyOpened={false}
            links={item.links}
          />
        ))}
      </ScrollArea>
      {footerComponent}
    </Paper>
  );
}