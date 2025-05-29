'use client';

import { Button, Group, ScrollArea, Title, UnstyledButton, Text } from '@mantine/core';
import LinksGroup from '@/shared/components/LinksGroup';
import classes from './ResearcherSidebar.module.css';
import { ArrowLeft, ArrowRightLeft, CalendarCheck, CircuitBoard, FileBarChart, LineChart, Lock, LucideIcon, Settings } from 'lucide-react';

export default function ResearcherSidebar({experimentId}: {experimentId?: string}) {
    const experimentMenu = {
      label: 'Experiments',
      icon: CircuitBoard,
    }

    const mockdata = [
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

  if (!experimentId) {
    return (
          <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
            <Title order={5}>
                PhishingStressor dashboard
            </Title>
        </Group>
      </div>
      <div className={classes.links} style={{ flex: 1 }}>
        <LinksGroup
              icon={experimentMenu.icon}
              label={experimentMenu.label}
              initiallyOpened={false}
            />
    </div>

      <div className={classes.footer}>
        <Button variant="outline" color="red" fullWidth leftSection={<ArrowLeft size={16} />} component="a" href="/api/auth/signout">
            Sign out
        </Button>
      </div>
    </nav>
    );
  }


  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
            <Title order={5}>
                PhishingStressor dashboard
            </Title>
        </Group>
      </div>
      
      <div className={classes.footer}>
            <UnstyledButton className={classes.user}>
        <Group>
            <div style={{ flex: 1 }}>
            <Text c="dimmed" size="xs">
                Current experiment
            </Text>
            <Text size="sm" fw={500}>
                Experiment 1
            </Text>
            </div>

            <ArrowRightLeft size={14} />
        </Group>
        </UnstyledButton>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {mockdata.map((item) => (
            <LinksGroup
              key={item.label}
              icon={item.icon as LucideIcon}
              label={item.label}
              initiallyOpened={false}
              links={item.links}
            />
          ))}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <Button variant="outline" color="red" fullWidth leftSection={<ArrowLeft size={16} />} component="a" href="/api/auth/signout">
            Sign out
        </Button>
      </div>
    </nav>
  );
}
