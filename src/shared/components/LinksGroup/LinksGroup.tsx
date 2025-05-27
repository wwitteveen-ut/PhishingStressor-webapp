'use client';

import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './LinksGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export default function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened = false,
  links = [],
}: LinksGroupProps) {
  const hasLinks = links.length > 0;
  const [opened, setOpened] = useState(initiallyOpened);

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
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
