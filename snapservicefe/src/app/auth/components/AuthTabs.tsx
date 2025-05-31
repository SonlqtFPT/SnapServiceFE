'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthTabs() {
  const pathname = usePathname()

  return (
    <div className="flex justify-center mb-6 text-xl font-semibold">
      <Link
        href="/auth/login"
        className={`mr-6 pb-1 
            ${pathname === '/auth/login' 
                ? 'text-black border-b-2 border-black' 
                : 'text-gray-400 hover:text-black'}
        `}
      >
        Login
      </Link>

      <Link
        href="/auth/register"
        className={`pb-1
          ${pathname === '/auth/register'
            ? 'text-black border-b-2 border-black'
            : 'text-gray-400 hover:text-black'}
        `}
      >
        Register
      </Link>
    </div>
  )
}
