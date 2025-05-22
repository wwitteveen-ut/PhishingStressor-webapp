"use client"
import { useEmailClientStore } from '@/mail/providers/EmailClientStoreProvider';
import {
  InboxIcon,
  TrashIcon,
} from 'lucide-react'

export default function EmailCategoryList() {
  const selectCategory = useEmailClientStore((state) => state.selectCategory);
  const activeCategory: string = useEmailClientStore((state) => state.selectedCategory);
  const emails = useEmailClientStore((state) => state.emails);


  const menuItems = [
    {
      id: 'inbox',
      label: 'Inbox',
      icon: InboxIcon,
      count: emails.length,
    },
    {
      id: 'trash',
      label: 'Trash',
      icon: TrashIcon,
    },
  ]

    return (
      <nav className="mt-6 flex-1 overflow-y-auto">
        <ul>
          {menuItems.map((item) => (
             <li key={item.id}>
                <button
                onClick={() => selectCategory(item.id)}
                className={`flex items-center w-full px-4 py-2 text-sm ${activeCategory === item.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                <item.icon size={18} className="mr-3" />
                <span>{item.label}</span>
                {item.count && (
                    <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-xs ${activeCategory === item.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
                    >
                    {item.count}
                    </span>
                )}
                </button>
            </li>
          ))}
        </ul>
      </nav>
    );
}