"use client";

import { registerResearcher } from "@/auth/actions/actions";
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Popover,
  Progress,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { hasLength, matchesField, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  AlertCircle,
  ArrowRight,
  Beaker,
  Check,
  RectangleEllipsis,
  User,
  X,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
      component="div"
    >
      {meets ? <Check size={14} /> : <X size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function ResearcherForm() {
  const [error, setError] = useState<string | null>(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: hasLength(
        { min: 2, max: 20 },
        "Name must be 2-10 characters long"
      ),
      password: (value) => {
        if (getStrength(value) < 100)
          return "The password does not meet the criteria";
        return null;
      },
      confirmPassword: matchesField("password", "Passwords must match"),
    },
  });

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.getValues().password)}
    />
  ));
  const strength = getStrength(form.getValues().password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const router = useRouter();

  const handleSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await registerResearcher({
      username,
      password,
    });
    if (response.ok) {
      const response = signIn("researcher", {
        username,
        password,
        redirect: false,
      });
      const authResponse = await response;
      if (authResponse.error && authResponse.code) {
        setError(authResponse.code);
      } else if (authResponse.ok) {
        router.push("/researcher/experiments");
      }
    }
  };

  return (
    <Container size="md" className="w-100">
      <Stack gap={"xs"}>
        <div className="flex items-center justify-center">
          <ThemeIcon variant="transparent" size={69}>
            <Beaker size={69} />
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
          Register as researcher
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={"md"}>
            <TextInput
              leftSection={<User size={16} />}
              placeholder="Username"
              required
              className="w-full"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
            <Popover
              opened={popoverOpened}
              position="bottom"
              width="target"
              transitionProps={{ transition: "pop" }}
            >
              <Popover.Target>
                <div
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                >
                  <PasswordInput
                    required
                    leftSection={<RectangleEllipsis size={16} />}
                    placeholder="Password"
                    key={form.key("password")}
                    visible={visible}
                    onVisibilityChange={toggle}
                    {...form.getInputProps("password")}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement
                  label="Includes at least 6 characters"
                  meets={form.getValues().password.length > 5}
                />
                {checks}
              </Popover.Dropdown>
            </Popover>
            <PasswordInput
              leftSection={<RectangleEllipsis size={16} />}
              placeholder="Confirm password"
              required
              className="w-full"
              visible={visible}
              onVisibilityChange={toggle}
              error={form.errors.confirmPassword && "hello"}
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />
            {error && (
              <Paper bg={"red.0"} radius={"xs"}>
                <Group gap={0} flex={1} justify="center">
                  <ThemeIcon c={"red"} variant="transparent">
                    <AlertCircle size={16} />
                  </ThemeIcon>
                  <Text c="red.6" size="sm">
                    {error}
                  </Text>
                </Group>
              </Paper>
            )}
            <Button
              type="submit"
              fullWidth
              rightSection={<ArrowRight size={16} />}
            >
              Register
            </Button>
          </Stack>
        </form>
        <div className="text-center">
          <Button
            variant="subtle"
            rightSection={<ArrowRight size={18} />}
            component={Link}
            href="/login/researcher"
          >
            Go to Researcher login
          </Button>
        </div>
      </Stack>
    </Container>
  );
}
