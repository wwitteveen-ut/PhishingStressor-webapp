"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
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
    <Container size="sm" py="xl">
      <Title order={1} ta="center" mb="xl">
        Something went wrong!
      </Title>
      <Text c="dimmed" size="lg" ta="center" mb="xl">
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
    </Container>
  );
}
