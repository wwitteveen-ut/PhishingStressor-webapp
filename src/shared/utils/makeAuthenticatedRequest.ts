"use server";

import { auth } from "@/auth";
import { getExternalApiUrl } from "./externalApiHelper";

export async function makeAuthenticatedRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await auth();
  if (!session?.user?.apiToken) {
    throw new Error("Not authenticated or missing API token");
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