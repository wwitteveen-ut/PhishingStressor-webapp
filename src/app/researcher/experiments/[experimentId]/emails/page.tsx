import { Group, Paper, Container, Title } from "@mantine/core";
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
        <>
        <Group>
            <Title order={2} c="gray.9" mb="lg">
            Experiment Emails
            </Title> 
        </Group>
        <Paper shadow="sm" p="lg" radius="md">
            <ExperimentEmailList />
        </Paper>
        </>
    );
}
