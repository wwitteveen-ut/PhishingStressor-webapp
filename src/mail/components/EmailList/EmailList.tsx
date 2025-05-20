import EmailListFilters from "../EmailListFilters";

export default function EmailList() {

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <EmailListFilters />
      <div className="flex-1 overflow-y-auto">
        Email component here
      </div>
    </div>
  )
}
