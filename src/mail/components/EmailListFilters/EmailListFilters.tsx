import { SearchIcon, FilterIcon } from 'lucide-react';


export default function EmailListFilters() {
    return (
        <div className="p-3 border-b border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5">
            <SearchIcon size={18} className="text-gray-500 mr-2" />
            <input
                type="text"
                placeholder="Search emails"
                className="bg-transparent border-none outline-none text-sm flex-1 text-gray-700 placeholder-gray-500"
            />
            <button className="text-gray-500 hover:text-gray-700">
                <FilterIcon size={18} />
            </button>
            </div>
        </div>
    );
}