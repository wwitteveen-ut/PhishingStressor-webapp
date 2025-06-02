"use server";
import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { ApiUser, Experiment } from "../store/types";

export const getExperiment = async (experimentId: number): Promise<Experiment> => {
    const path = await getExternalApiUrl(`/api/experiments/${experimentId}`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export const getExperiments = async (): Promise<Experiment[]> => {
    const path = await getExternalApiUrl(`/api/experiments`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export const getResearchers = async (): Promise<ApiUser[]> => {
    const path = await getExternalApiUrl(`/api/researchers`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}