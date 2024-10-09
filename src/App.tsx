import React, { useState } from 'react'
import Editor from './components/Editor'
import CannedReplyManager from './components/CannedReplyManager'
import { Pencil, MessageSquare } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('editor')

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Support Agent Assistant</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('editor')}
              className={`${
                activeTab === 'editor'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <Pencil className="inline-block mr-2" size={18} />
              Editor
            </button>
            <button
              onClick={() => setActiveTab('cannedReplies')}
              className={`${
                activeTab === 'cannedReplies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              <MessageSquare className="inline-block mr-2" size={18} />
              Canned Replies
            </button>
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'editor' ? <Editor /> : <CannedReplyManager />}
        </div>
      </div>
    </div>
  )
}

export default App