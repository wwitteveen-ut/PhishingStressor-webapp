import { auth } from "@/auth";
import MailCategoryList from "@/mail/components/EmailCategoryList/EmailCategoryList";
import { redirect } from "next/navigation";

export default async function Sidebar() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            PhishingStressor
          </h1>
        </div>
      </div>
      <MailCategoryList />
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-md text-gray-500">{session.user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
