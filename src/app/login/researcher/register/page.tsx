import { auth, Role } from "@/auth";
import { canRegisterResearcher } from "@/auth/actions/actions";
import ResearcherForm from "@/researcher/components/ResearcherForm";
import { Center } from "@mantine/core";
import { permanentRedirect } from "next/navigation";

export default async function ResearcherRegisterPage() {
  const session = await auth();

  if (session?.user) {
    const redirectUrl =
      session.user.role === Role.RESEARCHER
        ? "/researcher/experiments"
        : "/mail";
    permanentRedirect(redirectUrl);
  }
  const canRegister = await canRegisterResearcher();

  if (!canRegister) {
    permanentRedirect("/login/researcher");
  }

  return (
    <Center h={"100vh"}>
      <ResearcherForm />
    </Center>
  );
}
