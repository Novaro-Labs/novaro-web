import React from 'react'

export const CommunityHeader = () => {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="flex items-center flex-1">
        <img 
          className="w-12 h-12 rounded-full"
          src="/placeholder-community.png" 
          alt="Community"
        />
        <div className="ml-4 flex-1">
          <h1 className="text-xl font-bold">Community Name</h1>
          <p className="text-gray-600">Token Description Token Description Token Description</p>
        </div>
        <div className="flex items-center bg-green-100 rounded-full px-4 py-1">
          <span className="text-green-800">128</span>
        </div>
      </div>
    </div>
  )
}
