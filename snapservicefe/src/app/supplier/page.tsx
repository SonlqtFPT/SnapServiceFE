"use client"

import Link from "next/link"
import {
  Boxes,
  ShoppingCart,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthListener } from "@/hooks/useAuthListener"

const navItems = [
  {
    title: "Inventory",
    icon: <Boxes className="h-8 w-8 text-primary" />,
    href: "/supplier/inventory",
  },
  {
    title: "Orders",
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    href: "/supplier/orders",
  },
  {
    title: "Profile",
    icon: <User className="h-8 w-8 text-primary" />,
    href: "/supplier/profile",
  },
]

export default function SupplierHomePage() {
  const user = useAuthListener()

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">
        Welcome back{user.FullName ? `, ${user.FullName}` : ""}
      </h1>

      {/* Grid: evenly spaced nav items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.map((item) => (
          <Link key={item.title} href={item.href} className="group">
            <Card className="transition-all duration-200 hover:shadow-md hover:border-primary border-muted">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                {item.icon}
                <span className="text-lg font-medium group-hover:text-primary">
                  {item.title}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
