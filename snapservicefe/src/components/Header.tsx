'use client'

import Link from 'next/link'
import { Search, ShoppingCart, Package } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Header() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    console.log('Searching:', query)
    //test trước, tính sau
  }

  return (
    <header className="bg-white text-[#6B7280] py-4 px-8 border-b border-[#E5E7EB]">
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch()
                }}
                className="w-full"
                />
            </div>

        <div className="flex justify-end items-center space-x-4 font-bold whitespace-nowrap">
            <Link href="/auth">Login/Register</Link>
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
