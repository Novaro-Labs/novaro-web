import React from 'react'

interface Message {
  id: string
  avatar: string
  name: string
  timestamp: string
  content: string
}

export const MessageList = () => {
  const messages: Message[] = [
    {
      id: '1',
      avatar: '/placeholder-avatar.png',
      name: 'Name',
      timestamp: 'November 26,9:17 AM',
      content: 'Lorem ipsum dolor sit amet...'
    }
    // Add more message data as needed
  ]

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map(message => (
        <div key={message.id} className="mb-6">
          <div className="flex items-center mb-2">
            <img 
              src={message.avatar} 
              alt={message.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <span className="font-medium">{message.name}</span>
              <span className="text-gray-500 ml-2">{message.timestamp}</span>
            </div>
          </div>
          <p className="text-gray-700 ml-13">{message.content}</p>
        </div>
      ))}
    </div>
  )
}
