"use server";

import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { ApiUser, Experiment, ExperimentCreatePayload } from "../store/types";
export async function getExperiment(experimentId: string): Promise<Experiment> {
    const path = await getExternalApiUrl(`/experiments/${experimentId}`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export async function getExperiments(): Promise<Experiment[]> {
    const path = await getExternalApiUrl(`/experiments`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export async function getResearchers(): Promise<ApiUser[]> {
    const path = await getExternalApiUrl(`/researchers`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export async function createExperiment(experimentPayload: ExperimentCreatePayload):Promise<boolean> {
    const path = await getExternalApiUrl(`/experiments`);
    const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(experimentPayload),
    });

    return response.ok;
}

export async function deleteExperiment(experimentId: string):Promise<boolean> {
    const path = await getExternalApiUrl(`/experiments/${experimentId}`);
    const response = await fetch(path, {
        method: 'DELETE',
    });

    return response.ok;
}

export async function addResearcherToExperiment(experimentId: string, researcherId: string):Promise<boolean> {
    const path = await getExternalApiUrl(`/experiments/${experimentId}/researchers`);
    const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify({
            id: researcherId
        }),
    });

    return response.ok;
}

export async function removeResearcherFromExperiment(experimentId: string, researcherId: string):Promise<boolean> {
    const path = await getExternalApiUrl(`/experiments/${experimentId}/researchers`);
    const response = await fetch(path, {
        method: 'DELETE',
        body: JSON.stringify({
            id: researcherId
        }),
    });

    return response.ok;
}