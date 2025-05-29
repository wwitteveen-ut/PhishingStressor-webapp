"use server";
import { auth } from "@/auth";
import { Email } from "../store/types";

export const getEmail = async (id: number): Promise<Email> => {
    const response = await fetch(`${process.env.API_BASE_URL}/api/mails/${id}`);
    const data = await response.json();
    return data;
}

export const getEmails = async (): Promise<Email[]> => {
    const token = await auth();
    if (!token){
        throw new Error("not good!");
    }
    const response = await fetch(`${process.env.API_BASE_URL}/api/experiments/${token.user.experimentId}/emails`);
    const data = await response.json();
    return data;
}