"use client";

import {
  Box,
  Button,
  Container,
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
  ArrowRight,
  Beaker,
  Check,
  RectangleEllipsis,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
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
        <form
          onSubmit={form.onSubmit((form) => {
            console.log(form);
          })}
        >
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
