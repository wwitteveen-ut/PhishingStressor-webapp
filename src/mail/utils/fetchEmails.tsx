"use client";

import { getApiUrl } from "@/shared/utils/apiHelper";
import { startTransition } from "react";
import { EmailClientState } from "../store/EmailClientStore";

export const fetchAndSetEmails = async (setEmails: EmailClientState['setEmails']) => {

    try {
        const response = await fetch(getApiUrl("/emails"));
        const emails = await response.json();

        startTransition(() => {
            setEmails(emails);
        });
    } catch (err) {
    console.error("Error fetching emails:", err);
    }
};