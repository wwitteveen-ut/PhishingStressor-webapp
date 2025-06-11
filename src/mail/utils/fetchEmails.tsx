"use client";

import { getApiUrl } from "@/shared/utils/apiHelper";
import { getSession, signOut } from "next-auth/react";
import { startTransition } from "react";
import { EmailClientState } from "../store/EmailClientStore";

export const fetchAndSetEmails = async (
  setEmails: EmailClientState["setEmails"]
) => {
  try {
    const session = await getSession();
    if (!session) {
      await signOut({ redirectTo: "/login?warning=The+experiment+has+ended!" });
    }
    const response = await fetch(getApiUrl("/emails"));
    if (response.ok) {
      const emails = await response.json();

      startTransition(() => {
        setEmails(emails);
      });
    }
  } catch (err) {
    console.error("Error fetching emails:", err);
  }
};
