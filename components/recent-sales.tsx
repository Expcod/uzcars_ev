"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface SaleWithDetails {
  id: number
  sale_date: string
  sale_price: number
  owner: {
    first_name: string
    last_name: string
  }
  car: {
    brand: string
    model: string
  }
}

export default function RecentSales() {
  const [sales, setSales] = useState<SaleWithDetails[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          id,
          sale_date,
          sale_price,
          owner:owners(first_name, last_name),
          car:cars(brand, model)
        `)
        .order("sale_date", { ascending: false })
        .limit(5)

      if (error) {
        console.error("Error fetching recent sales:", error)
        return
      }

      setSales(data as SaleWithDetails[])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-[300px]">Loading recent sales...</div>
  }

  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {sale.owner.first_name[0]}
              {sale.owner.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.owner.first_name} {sale.owner.last_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {sale.car.brand} {sale.car.model}
            </p>
          </div>
          <div className="ml-auto font-medium">${Number.parseFloat(sale.sale_price.toString()).toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
