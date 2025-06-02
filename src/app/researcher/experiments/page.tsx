"use server";

import { getExperiments } from "@/researcher/actions/actions";
import ExperimentList from "@/researcher/components/ExperimentList";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { ScrollArea } from "@mantine/core";

export default async function ExperimentsPage() {
    const experiments = await getExperiments();

    return (
        <>
             <ResearcherSidebar />
             <ScrollArea flex={1}>
                <ExperimentList experiments={experiments}/> 
             </ScrollArea>
        </>
    );
}
