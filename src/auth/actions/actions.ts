"use server";

import { getApiUrl } from "@/shared/utils/apiHelper";

export async function authenticateParticipant(email: string, password: string) {
  const res = await fetch(getApiUrl("/api/auth/login/participant"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Authentication failed");
  }

  return res.json();
}