"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  BarChart2,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthListener } from "@/hooks/useAuthListener"

const navItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    href: "/supplier/dashboard",
  },
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
    title: "Report",
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    href: "/supplier/report",
  },
  {
    title: "Profile",
    icon: <User className="h-8 w-8 text-primary" />,
    href: "/supplier/profile",
  },
]

export default function SupplierHomePage() {
  const user = useAuthListener()

  const topRowItems = navItems.slice(0, 3)
  const bottomRowItems = navItems.slice(3)

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-8">
        Welcome back{user.FullName ? `, ${user.FullName}` : ""} 
      </h1>

      {/* Top row: 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {topRowItems.map((item) => (
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

      {/* Bottom row: 2 items centered */}
      <div className="flex flex-wrap justify-center gap-6">
        {bottomRowItems.map((item) => (
          <Link key={item.title} href={item.href} className="group w-full sm:w-1/2 md:w-[250px]">
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
