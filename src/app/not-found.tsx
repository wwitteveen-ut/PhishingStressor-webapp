import { Button, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack flex={1} gap={0} h="100vh" justify="center">
      <Title order={1} ta="center" mb="xl" c="blue.6">
        Page Not Found
      </Title>
      <Text c="dimmed" size="lg" ta="center" mb="xl">
        The page you are looking for does not exist or has been moved.
      </Text>
      <Group justify="center">
        <Button variant="light" component={Link} href="/">
          Go back home
        </Button>
      </Group>
    </Stack>
  );
}
