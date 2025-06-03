"use server";

import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";

export async function authenticateParticipant(username: string, password: string) {
  const res = await fetch(await getExternalApiUrl("/api/auth/login/participant"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: username, password }),
  });

  if (!res.ok) {
    throw new Error("Authentication failed");
  }

  return res.json();
}

export async function authenticateResearcher(username: string, password: string) {
  const res = await fetch(await getExternalApiUrl("/api/auth/login/researcher"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Authentication failed");
  }

  return res.json();
}