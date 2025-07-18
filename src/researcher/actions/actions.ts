"use server";

import { auth, Role } from "@/auth";
import { makeAuthenticatedRequest } from "@/shared/utils/authHelper";
import { revalidatePath } from "next/cache";
import {
  ApiUser,
  EmailCreatePayload,
  Experiment,
  ExperimentCreatePayload,
  ExperimentStats,
  ResearcherEmail,
} from "../store/types";

export async function getExperiment(experimentId: string): Promise<Experiment> {
  const response = await makeAuthenticatedRequest(
    `/experiments/${experimentId}`,
    Role.RESEARCHER
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch experiment: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getExperiments(): Promise<Experiment[]> {
  const response = await makeAuthenticatedRequest(
    `/experiments`,
    Role.RESEARCHER
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch experiments: ${
        response.status
      } with error: ${await response.text()}`
    );
  }

  const data = await response.json();
  return data;
}

export async function getResearchers(): Promise<ApiUser[]> {
  const response = await makeAuthenticatedRequest(
    `/researchers`,
    Role.RESEARCHER
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch researchers: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function createExperiment(
  experimentPayload: ExperimentCreatePayload
): Promise<{
  success: boolean;
  accounts?: { username: string; password: string }[];
}> {
  try {
    const session = await auth();
    const researcherId = session?.user?.id;
    if (!researcherId) {
      throw new Error("Not authenticated or missing researcherId");
    }
    if (!experimentPayload.researcherIds.includes(researcherId)) {
      experimentPayload.researcherIds.push(researcherId);
    }
    const response = await makeAuthenticatedRequest(
      `/experiments`,
      Role.RESEARCHER,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experimentPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to send reply: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    revalidatePath("/researcher/experiments");
    return { success: true, accounts: data.accounts };
  } catch (error) {
    console.error("Error creating experiment:", error);
    return { success: false };
  }
}

export async function deleteExperiment(experimentId: string): Promise<boolean> {
  try {
    const response = await makeAuthenticatedRequest(
      `/experiments/${experimentId}`,
      Role.RESEARCHER,
      {
        method: "DELETE",
      }
    );
    revalidatePath("/researcher/experiments");

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
      Role.RESEARCHER,
      {
        method: "POST",
        body: JSON.stringify({
          id: researcherId,
        }),
      }
    );
    revalidatePath("/researcher/experiments/[experimentId]", "layout");

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
      `/experiments/${experimentId}/researchers/${researcherId}`,
      Role.RESEARCHER,
      {
        method: "DELETE",
      }
    );
    revalidatePath("/researcher/experiments/[experimentId]", "layout");

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
      Role.RESEARCHER,
      {
        method: "DELETE",
      }
    );
    revalidatePath("/researcher/experiments/[experimentId]", "layout");
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
    `/experiments/${experimentId}/emails`,
    Role.RESEARCHER
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
    `/experiments/${experimentId}/statistics`,
    Role.RESEARCHER
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
    `/experiments/${experimentId}/emails/${emailId}`,
    Role.RESEARCHER
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
      Role.RESEARCHER,
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
    revalidatePath("/researcher/experiments/[experimentId]", "layout");

    return true;
  } catch (error) {
    console.error("Error creating email:", error);
    return false;
  }
}
