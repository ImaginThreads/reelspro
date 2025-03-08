"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()

  const handleSignout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Signout error:', error)
    }
  }

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Video App
        </Link>
        <nav>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-white">Welcome, {session.user?.email}</span>
              <button 
                onClick={handleSignout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link 
                href="/login"
                className="text-white hover:text-gray-300"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header