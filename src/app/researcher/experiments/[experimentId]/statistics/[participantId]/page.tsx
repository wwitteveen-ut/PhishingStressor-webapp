import ParticipantDetail from "@/researcher/components/ParticipantDetail";

export default async function ExperimentsPage({
  params,
}: {
  params: Promise<{ participantId: string }>;
}) {
  const { participantId } = await params;
  return <ParticipantDetail participantId={participantId} />;
}
