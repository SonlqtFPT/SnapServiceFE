'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Package } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthListener } from '@/hooks/useAuthListener'
import { searchProductRequest } from '@/model/request/productRequest'

export default function Header() {
  const router = useRouter()
  const user = useAuthListener()
  const [query, setQuery] = useState<searchProductRequest>({
    q: '',
    categoryId: null,
    page: 1,
    size: 20,
    sortOrder: 'desc',
    sortBy: 'createdAt',
  })

  const [showDropdown, setShowDropdown] = useState(false)

  const handleSearch = () => {
    router.push(`/products?q=${query.q}&page=${query.page}&pageSize=${query.size}&sortOrder=${query.sortOrder}&sortBy=${query.sortBy}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    document.cookie = "token=; path=/; max-age=0";
    window.dispatchEvent(new Event('logout'))
    setShowDropdown(false)
    router.push('/home')
  }

  return (
    <header className="bg-gray-200 text-[#6B7280] py-4 px-8 border-b border-[#E5E7EB] relative z-50">
      <nav className="grid grid-cols-3 items-center gap-4">
        <div>
          <Link href="/" className="text-xl font-bold whitespace-nowrap">
            SnapService
          </Link>
        </div>

        <div className="relative w-full max-w-3xl mx-auto">
          <Search
            onClick={handleSearch}
            className="absolute right-3 top-1/2 h-5 w-5 text-muted-foreground -translate-y-1/2 cursor-pointer"
          />
          <Input
            type="text"
            placeholder="Search products..."
            value={query.q}
            onChange={(e) => setQuery({ ...query, q: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
            className="w-full"
          />
        </div>

        <div className="flex justify-end items-center space-x-4 font-bold whitespace-nowrap relative">
          {user.UserId ? (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="cursor-pointer">Welcome, <strong>{user.FullName}</strong></div>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    <div className="flex flex-col">
                      <Link
                        href="/profile"
                        className="px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-left text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/auth/login">Login/Register</Link>
          )}

          <Link href="/cart" className="flex items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            Cart
          </Link>
          <Link href="/orders" className="flex items-center gap-1">
            <Package className="w-5 h-5" />
            Orders
          </Link>
        </div>
      </nav>
    </header>
  )
}
