"use server";
import { Experiment } from "../store/types";

export const getExperiment = async (experimentId: number): Promise<Experiment> => {
    const response = await fetch(`${process.env.API_BASE_URL}/api/experiments/${experimentId}`);
    const data = await response.json();
    return data;
}

export const getExperiments = async (): Promise<Experiment[]> => {
    const response = await fetch(`${process.env.API_BASE_URL}/api/experiments`);
    const data = await response.json();
    return data;
}