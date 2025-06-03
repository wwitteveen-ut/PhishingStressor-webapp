"use client";

import { Experiment } from "@/researcher/store/types";
import { createContext, useContext } from "react";

const ExperimentContext = createContext<Experiment | undefined>(undefined);

type ExperimentProviderProps = {
    children :React.ReactNode;
    experiment: Experiment;
}

export const ExperimentProvider = ({children, experiment}:ExperimentProviderProps) => {
    return <ExperimentContext value={experiment}>{children}</ExperimentContext>;
}

export const useExperimentContext = () => {
    const context = useContext(ExperimentContext);

    if (!context) {
        throw new Error('useExperimentContext must be used within an ExperimentProvider');
    }
    
    return context;
}