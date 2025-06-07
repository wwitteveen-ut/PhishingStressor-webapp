import { canRegisterResearcher } from "@/auth/actions/actions";
import LoginForm from "@/auth/components/LoginForm/LoginForm";
import { Center } from "@mantine/core";

export default async function ResearcherLoginPage() {
  const canRegister = await canRegisterResearcher();
  return (
    <Center h={"100vh"}>
      <LoginForm variant="researcher" canRegister={canRegister} />
    </Center>
  );
}
