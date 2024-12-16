import React from 'react'

export const StakePanel = () => {
  return (
    <div className="w-80 border-l">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img 
              src="/usdt-icon.png" 
              alt="USDT"
              className="w-8 h-8"
            />
            <span className="ml-2 font-medium">USDT</span>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Exchange
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Stake</span>
            <span>Claim</span>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">Stake</h3>
            <p className="text-sm text-gray-500">Available Balance: $0 (ETH)</p>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">100.50</span>
                <img src="/usdt-icon.png" alt="USDT" className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-500">$12.50</p>
            </div>
            <button className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-4">
              Stake
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
