import React from 'react'
import { Header } from './components/Header'
import { CommunityHeader } from './components/CommunityHeader'
import { MessageList } from './components/MessageList'
import { MessageInput } from './components/MessageInput'
import { StakePanel } from './components/StakePanel'

export default function CommunityDetailPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <CommunityHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <MessageList />
          <MessageInput />
        </div>
        <StakePanel />
      </div>
    </div>
  )
}
