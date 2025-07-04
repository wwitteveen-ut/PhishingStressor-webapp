"use server";
import { auth } from "@/auth";
import { getResearchers } from "@/researcher/actions/actions";
import { redirect } from "next/navigation";
import ExperimentForm from "./ExperimentForm";

export default async function ExperimentFormContainer() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const researchers = await getResearchers();
  const researcherChoices = researchers
    .filter((researcher) => researcher.id !== session.user.id)
    .map((researcher) => ({
      label: researcher.username,
      value: researcher.id,
    }));

  return <ExperimentForm researcherChoices={researcherChoices} />;
}
