"use client";

import { ExperimentStats } from "@/researcher/store/types";
import { createContext, useContext } from "react";

const ExperimentStatsContext = createContext<ExperimentStats | undefined>(
  undefined
);

type ExperimentProviderProps = {
  children: React.ReactNode;
  experimentStats: ExperimentStats;
};

export const ExperimentStatsProvider = ({
  children,
  experimentStats,
}: ExperimentProviderProps) => {
  return (
    <ExperimentStatsContext value={experimentStats}>
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
