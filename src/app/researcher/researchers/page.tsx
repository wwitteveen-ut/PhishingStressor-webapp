"use server";

import { getResearchers } from "@/researcher/actions/actions";
import ResearcherList from "@/researcher/components/ResearcherTable";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { ScrollArea } from "@mantine/core";

export default async function ExperimentsPage() {
    const researchers = await getResearchers();

    return (
        <>
             <ResearcherSidebar />
             <ScrollArea flex={1}>
                <ResearcherList researchers={researchers}/>
             </ScrollArea>
        </>
    );
}
