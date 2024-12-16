import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="flex items-center p-4 border-b">
      <Link to="/community" className="flex items-center text-gray-600 hover:text-gray-900">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Community
      </Link>
    </header>
  )
}
