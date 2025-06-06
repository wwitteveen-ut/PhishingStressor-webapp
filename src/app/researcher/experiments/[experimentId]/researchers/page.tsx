import { Container, Paper } from "@mantine/core";
import ExperimentResearcherList from "@/researcher/components/ExperimentResearcherList";
import { auth } from "@/auth";
import { getResearchers } from "@/researcher/actions/actions";
import { redirect } from "next/navigation";

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
        <Container p="xl" flex={1}>
            <Paper shadow="sm" p="lg" radius="md">
                    <ExperimentResearcherList variant="edit" researcherChoices={researcherChoices}/>
            </Paper>
        </Container>
    );
}
