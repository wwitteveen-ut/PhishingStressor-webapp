"use server";

import { auth, Role } from "@/auth";
import LoginForm from "@/auth/components/LoginForm";
import { Center } from "@mantine/core";
import { permanentRedirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    const redirectUrl =
      session.user.role === Role.RESEARCHER
        ? "/researcher/experiments"
        : "/mail";
    permanentRedirect(redirectUrl);
  }
  return (
    <Center h={"100vh"}>
      <LoginForm />
    </Center>
  );
}
