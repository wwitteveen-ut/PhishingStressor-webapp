"use client";

import {
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Beaker,
  Mail,
  RectangleEllipsis,
  User,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ILoginFormProps {
  variant?: "participant" | "researcher";
  canRegister?: boolean;
}

export default function LoginForm({
  variant = "participant",
  canRegister = false,
}: ILoginFormProps) {
  const [message, setMessage] = useState<{
    type: "warning" | "error";
    message: string;
  } | null>(null);
  const [isLoading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);
  const searchParams = useSearchParams();

  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const warning = searchParams.get("warning");
    if (warning) {
      setMessage({
        type: "warning",
        message: warning,
      });
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [searchParams, router]);

  const credentialsAction = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    startLoading();
    const response = signIn(variant, {
      username,
      password,
      redirect: false,
    });
    const authResponse = await response;
    if (authResponse.error && authResponse.code) {
      setMessage({
        type: "error",
        message: authResponse.code,
      });
    } else if (authResponse.ok) {
      router.push(
        variant === "participant" ? "/mail" : "/researcher/experiments"
      );
    }
    stopLoading();
  };

  return (
    <Container size="md" className="w-100">
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack gap="xs">
          <div className="flex items-center justify-center">
            <ThemeIcon size={69} variant="transparent">
              {variant === "researcher" ? (
                <Beaker size={69} />
              ) : (
                <Mail size={69} />
              )}
            </ThemeIcon>
          </div>

          <Title
            order={1}
            className="text-center text-3xl font-bold text-gray-900"
          >
            PhishingStressor
          </Title>
          <Title
            order={4}
            className="text-center text-2xl font-medium text-gray-400"
          >
            {variant === "researcher"
              ? "Sign in as researcher"
              : "Sign in as participant"}
          </Title>

          <form onSubmit={form.onSubmit(credentialsAction)}>
            <Stack gap={"md"}>
              <TextInput
                leftSection={<User size={16} />}
                placeholder="Username"
                required
                className="w-full"
                key={form.key("username")}
                {...form.getInputProps("username")}
              />
              <PasswordInput
                leftSection={<RectangleEllipsis size={16} />}
                placeholder="Password"
                required
                className="w-full"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              {message && (
                <Paper
                  bg={message.type === "warning" ? "yellow.0" : "red.0"}
                  p={2}
                  radius={"xs"}
                >
                  <Group gap={0} flex={1} justify="center">
                    <ThemeIcon
                      c={message.type === "warning" ? "yellow" : "red"}
                      variant="transparent"
                    >
                      <AlertCircle size={16} strokeWidth="2.5" />
                    </ThemeIcon>
                    <Text
                      c={message.type === "warning" ? "yellow.8" : "red.6"}
                      size="sm"
                      fw={600}
                    >
                      {message.message}
                    </Text>
                  </Group>
                </Paper>
              )}
              <Button
                type="submit"
                fullWidth
                rightSection={<ArrowRight size={16} />}
              >
                Sign in
              </Button>
            </Stack>
          </form>

          <div className="text-center">
            {variant === "participant" ? (
              <Button
                variant="subtle"
                rightSection={<ArrowRight size={18} />}
                component={Link}
                href="/login/researcher"
              >
                Go to Researcher login
              </Button>
            ) : (
              <Group justify={canRegister ? "space-between" : "center"} gap={0}>
                <Button
                  leftSection={<ArrowLeft size={18} />}
                  variant="subtle"
                  component={Link}
                  href="/login"
                >
                  To participant login
                </Button>
                {canRegister && (
                  <Button
                    rightSection={<ArrowRight size={18} />}
                    color={"gray"}
                    variant="subtle"
                    component={Link}
                    href="/login/researcher/register"
                  >
                    Or register here
                  </Button>
                )}
              </Group>
            )}
          </div>
        </Stack>
      </Box>
    </Container>
  );
}
