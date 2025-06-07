import { Paper } from "@mantine/core";
import { auth } from "@/auth";
import { getResearchers } from "@/researcher/actions/actions";
import { redirect } from "next/navigation";
import ExperimentEmailList from "@/researcher/components/ExperimentEmailList";

export default async function ExperimentsPage() {
    const session = await auth();
    if (!session) {
        redirect('/login')
    }
    
    const researchers = await getResearchers();
    const researcherChoices = researchers
        .filter((researcher) => researcher.id !== session.user.id)
        .map((researcher) => ({
            label: researcher.username,
            value: researcher.id
        }));
    return (
        <Paper shadow="sm" p="lg" radius="md" flex={1} m={"md"}>
            <ExperimentEmailList />
        </Paper>
    );
}
