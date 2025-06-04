import ResearcherForm from "@/researcher/components/ResearcherForm";
import { canRegisterResearcher } from "@/auth/actions/actions";
import { Center } from "@mantine/core";
import { permanentRedirect } from "next/navigation";

export default async function ResearcherRegisterPage() {
    const canRegister = await canRegisterResearcher();

    if (!canRegister){
        permanentRedirect('/login/researcher');
    }

    return (
        <Center h={"100vh"}>
            <ResearcherForm/>
        </Center>
    );
}
