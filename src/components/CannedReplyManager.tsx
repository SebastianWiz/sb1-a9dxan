import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface CannedReply {
  id: string
  name: string
  icon: string
  replies: string[]
}

const CannedReplyManager: React.FC = () => {
  const [cannedReplies, setCannedReplies] = useState<CannedReply[]>([])
  const [newReply, setNewReply] = useState({ name: '', icon: '', replies: [''] })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    chrome.storage.sync.get('cannedReplies', (result) => {
      if (result.cannedReplies) {
        setCannedReplies(result.cannedReplies)
      }
    })
  }, [])

  const saveCannedReplies = (updatedReplies: CannedReply[]) => {
    chrome.storage.sync.set({ cannedReplies: updatedReplies }, () => {
      setCannedReplies(updatedReplies)
    })
  }

  const handleAddReply = () => {
    if (newReply.name && newReply.icon && newReply.replies.length > 0) {
      const updatedReplies = [
        ...cannedReplies,
        { ...newReply, id: Date.now().toString() }
      ]
      saveCannedReplies(updatedReplies)
      setNewReply({ name: '', icon: '', replies: [''] })
    }
  }

  const handleEditReply = (id: string) => {
    const replyToEdit = cannedReplies.find(reply => reply.id === id)
    if (replyToEdit) {
      setNewReply(replyToEdit)
      setEditingId(id)
    }
  }

  const handleUpdateReply = () => {
    if (editingId) {
      const updatedReplies = cannedReplies.map(reply =>
        reply.id === editingId ? { ...newReply, id: editingId } : reply
      )
      saveCannedReplies(updatedReplies)
      setNewReply({ name: '', icon: '', replies: [''] })
      setEditingId(null)
    }
  }

  const handleDeleteReply = (id: string) => {
    const updatedReplies = cannedReplies.filter(reply => reply.id !== id)
    saveCannedReplies(updatedReplies)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Add New Canned Reply</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newReply.name}
            onChange={(e) => setNewReply({ ...newReply, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Icon (e.g., 'smile')"
            value={newReply.icon}
            onChange={(e) => setNewReply({ ...newReply, icon: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {newReply.replies.map((reply, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Reply ${index + 1}`}
              value={reply}
              onChange={(e) => {
                const updatedReplies = [...newReply.replies]
                updatedReplies[index] = e.target.value
                setNewReply({ ...newReply, replies: updatedReplies })
              }}
              className="w-full p-2 border rounded"
            />
          ))}
          <button
            onClick={() => setNewReply({ ...newReply, replies: [...newReply.replies, ''] })}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus className="inline-block mr-2" size={18} />
            Add Reply
          </button>
          <button
            onClick={editingId ? handleUpdateReply : handleAddReply}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
          >
            {editingId ? 'Update' : 'Save'} Canned Reply
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Existing Canned Replies</h2>
        <ul className="space-y-4">
          {cannedReplies.map((reply) => (
            <li key={reply.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{reply.name}</span>
                <div>
                  <button
                    onClick={() => handleEditReply(reply.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteReply(reply.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600">Icon: {reply.icon}</p>
              <ul className="list-disc list-inside mt-2">
                {reply.replies.map((r, index) => (
                  <li key={index} className="text-sm text-gray-700">{r}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CannedReplyManager