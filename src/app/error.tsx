"use client";

import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stack flex={1} gap={0} h="100vh" justify="center">
      <Title order={1} ta="center" mb="xl" c="blue.6">
        Something went wrong!
      </Title>
      <Text c="red" size="lg" ta="center" mb="xl">
        <span style={{ fontWeight: 600 }}>Error:</span>{" "}
        {error.message || "An unexpected error occurred"}
      </Text>
      <Group justify="center">
        <Button variant="light" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" component="a" href="/">
          Go back home
        </Button>
      </Group>
    </Stack>
  );
}
