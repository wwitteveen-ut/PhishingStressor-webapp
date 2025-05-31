"use server";
import { Experiment } from "../store/types";
import { getApiUrl } from "@/shared/utils/apiHelper";

export const getExperiment = async (experimentId: number): Promise<Experiment> => {
    const path = getApiUrl(`/api/experiments/${experimentId}`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export const getExperiments = async (): Promise<Experiment[]> => {
    const path = getApiUrl(`/api/experiments`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}