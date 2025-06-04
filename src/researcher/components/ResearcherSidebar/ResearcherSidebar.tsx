'use client';

import React from 'react';
import { 
  Paper, 
  Group, 
  Title, 
  Button, 
  ScrollArea, 
  Divider, 
  ThemeIcon,
} from '@mantine/core';
import { 
  LayoutDashboardIcon, 
  LucideIcon, 
  LogOut, 
  Users,
  FlaskConical
} from 'lucide-react';
import LinksGroup from '@/shared/components/LinksGroup';
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';

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
    label: 'Experiments',
    icon: FlaskConical,
    mainLink: "/researcher/experiments"
    },
    {
      label: 'Researchers',
      icon: Users,
      mainLink: "/researcher/researchers"
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

  return (
    <Paper 
      shadow="xs" 
      withBorder 
      style={{ width: 256, height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {headerComponent}
      <ScrollArea style={{ flex: 1, padding: '8px' }}>
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