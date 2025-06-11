"use client";

import { ExperimentStats, ResearcherEmail } from "@/researcher/store/types";
import { createContext, useContext, useMemo } from "react";

const ExperimentStatsContext = createContext<{
  experimentStats: ExperimentStats;
  experimentEmails: Record<string, ResearcherEmail>;
} | undefined>(
  undefined
);

type ExperimentProviderProps = {
  children: React.ReactNode;
  experimentStats: ExperimentStats;
  experimentEmails: ResearcherEmail[];
};

export const ExperimentStatsProvider = ({
  children,
  experimentStats,
  experimentEmails,
}: ExperimentProviderProps) => {  
  const experimentEmailsDict = useMemo(() => {
    return Object.fromEntries(
      experimentEmails.map(email => [email.id, email])
    );
  }, [experimentEmails]);
  return (
    <ExperimentStatsContext value={{ experimentStats, experimentEmails: experimentEmailsDict }}>
      {children}
    </ExperimentStatsContext>
  );
};

export const useExperimentStatsContext = () => {
  const context = useContext(ExperimentStatsContext);

  if (!context) {
    throw new Error(
      "useExperimentStatsContext must be used within an ExperimentStatsProvider"
    );
  }

  return context;
};
