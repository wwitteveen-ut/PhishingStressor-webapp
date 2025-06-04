'use client';

import { useState } from 'react';
import { IconChevronRight, TablerIcon } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './LinksGroup.module.css';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface LinksGroupProps {
  icon: LucideIcon | TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  active?: boolean;
  mainLink?: string;
  links?: { label: string; link: string }[];
}

export default function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened = false,
  active = false,
  mainLink,
  links = [],
}: LinksGroupProps) {
  
  const hasLinks = !mainLink && links.length > 0;
  const [opened, setOpened] = useState(initiallyOpened);

  if (mainLink){
    return (
      <UnstyledButton className={`${classes.control} ${active ? classes.active : ''}`} component={Link} href={mainLink}>
        <Group justify="space-between" gap={0}>
          <Group style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
        <Box>{label}</Box>
          </Group>
        </Group>
      </UnstyledButton>
    )
  }

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Group style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box>{label}</Box>
          </Group>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{
                transform: opened ? 'rotate(-90deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && <Collapse in={opened}>{links.map((link) => (
        <Text<'a'>
          component="a"
          className={classes.link}
          href={link.link}
          key={link.label}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </Text>
      ))}</Collapse>}
    </>
  );
}
