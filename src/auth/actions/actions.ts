"use server";

import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";

export async function authenticateParticipant(
  username: string,
  password: string,
) {
  try {
    const res = await fetch(
      await getExternalApiUrl("/auth/login/participant"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      },
    );

    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, error: "Invalid credentials" };
      }

      return { success: false, error: "Authentication failed" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error(
      "Authentication error:",
      error instanceof Error ? error.message : error,
    );
    return { success: false, error: "Authentication failed" };
  }
}

export async function authenticateResearcher(
  username: string,
  password: string,
) {
  try {
    const res = await fetch(await getExternalApiUrl("/auth/login/researcher"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, error: "Invalid credentials" };
      }

      return { success: false, error: "Authentication failed" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error(
      "Authentication error:",
      error instanceof Error ? error.message : error,
    );
    return { success: false, error: "Authentication failed" };
  }
}

export async function canRegisterResearcher(): Promise<boolean> {
  const res = await fetch(await getExternalApiUrl("/auth/register"));

  if (!res.ok) {
    throw new Error(`canRegisterResearcher fetch failed:${res.statusText}`);
  }

  return res.json();
}
