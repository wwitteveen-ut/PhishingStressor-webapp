"use server";

import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { ApiUser, Experiment } from "../store/types";
export async function getExperiment(experimentId: string): Promise<Experiment> {
    const path = await getExternalApiUrl(`/api/experiments/${experimentId}`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export async function getExperiments(): Promise<Experiment[]> {
    const path = await getExternalApiUrl(`/api/experiments`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export async function getResearchers(): Promise<ApiUser[]> {
    const path = await getExternalApiUrl(`/api/researchers`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export async function deleteExperiment(experimentId: string):Promise<boolean> {
    const path = await getExternalApiUrl(`/api/experiments/${experimentId}`);
    const response = await fetch(path, {
        method: 'DELETE',
    });

    return response.ok;
}