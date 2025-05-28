"use server";

import { getApiUrl } from "@/shared/utils/apiHelper";

export async function authenticateParticipant(username: string, password: string) {
  const res = await fetch(getApiUrl("/api/auth/login/participant"), {
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
  const res = await fetch(getApiUrl("/api/auth/login/participant"), {
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