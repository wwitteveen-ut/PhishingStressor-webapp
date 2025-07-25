"use server";

import { Experiment } from "@/researcher/store/types";
import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";

export async function authenticateParticipant(
  username: string,
  password: string
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
      }
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
      error instanceof Error ? error.message : error
    );
    return { success: false, error: "Authentication failed" };
  }
}

export async function authenticateResearcher(
  username: string,
  password: string
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
      error instanceof Error ? error.message : error
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

export const registerResearcher = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const path = await getExternalApiUrl(`/auth/register`);

    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error };
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error;
  }
};

interface Token {
  token: string;
  experimentId: string;
}

export async function getParticipantExperimentDetails(
  token: Token
): Promise<
  | { success: true; data: Omit<Experiment, "groups" | "researchers"> }
  | { success: false; error: string }
> {
  try {
    const url = await getExternalApiUrl(`/experiments/${token.experimentId}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (!response.ok) {
      return { success: false, error: "Failed to fetch experiment details" };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching experiment details:", error);
    return { success: false, error: "Failed to fetch experiment details" };
  }
}
