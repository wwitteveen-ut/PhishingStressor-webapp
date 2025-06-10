"use server";
import { auth, Role } from "@/auth";
import { Session } from "next-auth";
import { permanentRedirect } from "next/navigation";
import { getExternalApiUrl } from "./externalApiHelper";

export async function makeAuthenticatedRequest(
  endpoint: string,
  role: Role,
  options: RequestInit = {}
) {
  const session = await auth();
  if (!session?.user?.apiToken) {
    throw new Error("Not authenticated or missing API token");
  }
  if (session?.user?.role !== role) {
    throw new Error("Unauthorized: Invalid role");
  }

  const url = await getExternalApiUrl(endpoint);

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.user.apiToken}`,
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
  });
}

export async function validateUserRoleAndGetSession(
  role: Role
): Promise<Session> {
  const session = await auth();

  if (!session?.user) {
    permanentRedirect(
      role === Role.RESEARCHER ? "/login/researcher" : "/login"
    );
  }

  if (session.user.role !== role) {
    permanentRedirect(
      session.user.role === Role.RESEARCHER
        ? "/researcher/experiments"
        : "/mail"
    );
  }

  return session;
}
