"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Car, Users, Zap, ShoppingCart, Wrench, LayoutDashboard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Cars",
    href: "/cars",
    icon: Car,
  },
  {
    name: "Owners",
    href: "/owners",
    icon: Users,
  },
  {
    name: "Charging Stations",
    href: "/charging-stations",
    icon: Zap,
  },
  {
    name: "Sales",
    href: "/sales",
    icon: ShoppingCart,
  },
  {
    name: "Services",
    href: "/services",
    icon: Wrench,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background border-r border-border transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-border">
            <h1 className="text-xl font-bold">UzCars EV</h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium">UzCars EV Database</p>
                <p className="text-xs text-muted-foreground">Electric Vehicles in Uzbekistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
