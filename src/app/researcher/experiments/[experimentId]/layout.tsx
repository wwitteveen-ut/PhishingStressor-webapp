import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";

export default async function Layout({ children, params }: {
  children: React.ReactNode;
  params: { experimentId: string };
}) {
  const { experimentId } = await params; 

  return (
    <div className="flex h-screen bg-gray-100">
      <ResearcherSidebar experimentId={experimentId} />
      {children}
    </div>
  );
}