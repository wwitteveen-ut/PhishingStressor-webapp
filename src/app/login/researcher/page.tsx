"use server";
import { auth, Role } from "@/auth";
import { canRegisterResearcher } from "@/auth/actions/actions";
import LoginForm from "@/auth/components/LoginForm/LoginForm";
import { Center } from "@mantine/core";
import { permanentRedirect } from "next/navigation";

export default async function ResearcherLoginPage() {
  const session = await auth();

  if (session?.user) {
    const redirectUrl =
      session.user.role === Role.RESEARCHER
        ? "/researcher/experiments"
        : "/mail";
    permanentRedirect(redirectUrl);
  }
  const canRegister = await canRegisterResearcher();

  return (
    <Center h={"100vh"}>
      <LoginForm variant="researcher" canRegister={canRegister} />
    </Center>
  );
}
