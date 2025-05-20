import MailCategoryList from '@/mail/components/EmailCategoryList/EmailCategoryList'
import React from 'react'

export function Sidebar() {

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">PhishingStressor</h1>
        </div>
      </div>
      <MailCategoryList />
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
