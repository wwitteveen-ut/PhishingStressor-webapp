"use server";

import { getExperiments } from "@/researcher/actions/actions";
import ExperimentList from "@/researcher/components/ExperimentList";
import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";

export default async function ExperimentsPage() {
    const experiments = await getExperiments();

    return (
        <>
             <ResearcherSidebar />
             <ExperimentList experiments={experiments}/> 
        </>
    );
}
