import React from 'react'

export const MessageInput = () => {
  return (
    <div className="border-t p-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Write Message"
          className="flex-1 border rounded-lg px-4 py-2 mr-2"
        />
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
