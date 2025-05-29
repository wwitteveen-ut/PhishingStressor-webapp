import ResearcherSidebar from "@/researcher/components/ResearcherSidebar";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ experimentId: string }>;
}) {
  const { experimentId } = await params;

  return (
    <div className="flex h-screen bg-gray-100">
      <ResearcherSidebar experimentId={experimentId} />
      {children}
    </div>
  );
}
