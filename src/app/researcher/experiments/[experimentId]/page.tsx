"use server";

import { Role } from "@/auth";
import { getResearchers } from "@/researcher/actions/actions";
import ExperimentOverview from "@/researcher/components/ExperimentOverview";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { Title } from "@mantine/core";

export default async function ExperimentOverviewPage() {
  const session = await validateUserRoleAndGetSession(Role.RESEARCHER);

  const researchers = await getResearchers();
  const researcherChoices = researchers
    .filter((researcher) => researcher.id !== session.user.id)
    .map((researcher) => ({
      label: researcher.username,
      value: researcher.id,
    }));
  return (
    <>
      <Title order={2} c="gray.9" mb="lg">
        Experiment Overview
      </Title>
      <ExperimentOverview researcherChoices={researcherChoices} />
    </>
  );
}
