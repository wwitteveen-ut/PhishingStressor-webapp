"use client";

import {
  ActionIcon,
  Group,
  MantineColorsTuple,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Download } from "lucide-react";

interface ExperimentEmailAttachmentListItemProps {
  file: File;
  isPreview?: boolean;
}

function ExperimentEmailAttachmentListItem({
  file,
  isPreview = false,
}: ExperimentEmailAttachmentListItemProps) {
  const theme = useMantineTheme();

  const extension = file.name.split(".").pop()?.toLowerCase() || "file";
  const formatFileSize = (size: number): string =>
    `${(size / 1024 / 1024).toFixed(1)} MB`;

  const getColorForExtension = (ext: string): MantineColorsTuple => {
    switch (ext.toLowerCase()) {
      case "txt":
        return theme.colors.blue;
      case "jpg":
      case "png":
        return theme.colors.green;
      case "pdf":
        return theme.colors.red;
      default:
        return theme.colors.gray;
    }
  };

  const colorTuple = getColorForExtension(extension);

  return (
    <Paper
      p="xs"
      withBorder
      shadow="0"
      radius="md"
      bg={"gray.0"}
      style={{ alignItems: "center" }}
    >
      <Group gap="sm" align="center">
        <Paper
          w={40}
          h={40}
          radius="md"
          display="flex"
          style={{
            backgroundColor: colorTuple[1],
            color: colorTuple[6],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          .{extension}
        </Paper>
        <div>
          <Title order={6}>{file.name}</Title>
          <Text size="xs" c="dimmed">
            {formatFileSize(file.size)}
          </Text>
        </div>
        {isPreview && (
          <ActionIcon variant="transparent" color="gray">
            <Download size={18} />
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
}

interface ExperimentEmailAttachmentListProps {
  files: File[];
  isPreview?: boolean;
}

export default function ExperimentEmailAttachmentList({
  files,
  isPreview = false,
}: ExperimentEmailAttachmentListProps) {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <Paper p="md" radius="md" withBorder shadow="xs">
      <Title order={5} mb="sm" c="dimmed">
        Attachments ({files.length})
      </Title>
      <Group gap="sm" wrap="wrap">
        {files.map((file, index) => (
          <ExperimentEmailAttachmentListItem
            key={`${file.name}-${index}`}
            file={file}
            isPreview={isPreview}
          />
        ))}
      </Group>
    </Paper>
  );
}
