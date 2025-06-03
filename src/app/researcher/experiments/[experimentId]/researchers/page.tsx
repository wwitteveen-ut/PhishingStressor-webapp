"use client";

import ResearcherList from "@/researcher/components/ResearcherTable";
import { ScrollArea } from "@mantine/core";
import { useExperimentContext } from "@/researcher/components/ExperimentContext/ExperimentContext";

export default function ExperimentsPage() {
    const experiment = useExperimentContext();

    return (
        <>
             <ScrollArea flex={1}>
                <ResearcherList researchers={experiment.researchers}/>
             </ScrollArea>
        </>
    );
}
