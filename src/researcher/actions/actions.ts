"use server";

import { auth } from "@/auth";
import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import {
  ApiUser,
  EmailCreatePayload,
  Experiment,
  ExperimentCreatePayload,
  ExperimentStats,
  ResearcherEmail,
} from "../store/types";

async function makeAuthenticatedRequest(
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

export async function getExperiment(experimentId: string): Promise<Experiment> {
  const response = await makeAuthenticatedRequest(
    `/experiments/${experimentId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch experiment: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getExperiments(): Promise<Experiment[]> {
  const response = await makeAuthenticatedRequest(`/experiments`);

  if (!response.ok) {
    throw new Error(`Failed to fetch experiments: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getResearchers(): Promise<ApiUser[]> {
  const response = await makeAuthenticatedRequest(`/researchers`);

  if (!response.ok) {
    throw new Error(`Failed to fetch researchers: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function createExperiment(
  experimentPayload: ExperimentCreatePayload
): Promise<boolean> {
  try {
    const session = await auth();
    const researcherId = session?.user?.id;
    if (!researcherId) {
      throw new Error("Not authenticated or missing id");
    } else if (!experimentPayload.researchers.includes(researcherId)) {
      experimentPayload.researchers.push(researcherId);
    }

    const response = await makeAuthenticatedRequest(`/experiments`, {
      method: "POST",
      body: JSON.stringify(experimentPayload),
    });

    return response.ok;
  } catch (error) {
    console.error("Error creating experiment:", error);
    return false;
  }
}

export async function deleteExperiment(experimentId: string): Promise<boolean> {
  try {
    const response = await makeAuthenticatedRequest(
      `/experiments/${experimentId}`,
      {
        method: "DELETE",
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error deleting experiment:", error);
    return false;
  }
}

export async function addResearcherToExperiment(
  experimentId: string,
  researcherId: string
): Promise<boolean> {
  try {
    const response = await makeAuthenticatedRequest(
      `/experiments/${experimentId}/researchers`,
      {
        method: "POST",
        body: JSON.stringify({
          id: researcherId,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error adding researcher to experiment:", error);
    return false;
  }
}

export async function removeResearcherFromExperiment(
  experimentId: string,
  researcherId: string
): Promise<boolean> {
  try {
    const response = await makeAuthenticatedRequest(
      `/experiments/${experimentId}/researchers`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: researcherId,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error removing researcher from experiment:", error);
    return false;
  }
}

export async function deleteEmail(
  experimentId: string,
  emailId: string
): Promise<boolean> {
  try {
    const response = await makeAuthenticatedRequest(
      `/experiments/${experimentId}/emails/${emailId}`,
      {
        method: "DELETE",
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error deleting email:", error);
    return false;
  }
}

export async function getExperimentEmails(
  experimentId: string
): Promise<ResearcherEmail[]> {
  const response = await makeAuthenticatedRequest(
    `/experiments/${experimentId}/emails`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch experiment emails: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getExperimentStats(
  experimentId: string
): Promise<ExperimentStats> {
  const response = await makeAuthenticatedRequest(
    `/experiments/${experimentId}/statistics`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch experiment stats: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const getEmail = async (
  experimentId: string,
  emailId: string
): Promise<ResearcherEmail> => {
  const response = await makeAuthenticatedRequest(
    `/experiments/${experimentId}/emails/${emailId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch email: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export async function createEmail(
  experimentId: string,
  emailPayload: EmailCreatePayload
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("metadata", JSON.stringify(emailPayload.metadata));
    emailPayload.files.forEach((file) => {
      formData.append(`files`, file, file.name);
    });

    const response = await makeAuthenticatedRequest(
      `/experiments/${experimentId}/emails`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `Failed to create email: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error creating email:", error);
    return false;
  }
}
