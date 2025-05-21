"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function SalesChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("sales").select("sale_date, sale_price").order("sale_date")

      if (error) {
        console.error("Error fetching sales data:", error)
        return
      }

      // Group sales by month
      const salesByMonth = data.reduce(
        (acc, sale) => {
          const date = new Date(sale.sale_date)
          const month = date.toLocaleString("default", { month: "short" })

          if (!acc[month]) {
            acc[month] = {
              month,
              total: 0,
              count: 0,
            }
          }

          acc[month].total += Number.parseFloat(sale.sale_price)
          acc[month].count += 1

          return acc
        },
        {} as Record<string, { month: string; total: number; count: number }>,
      )

      // Convert to chart data format
      const chartData = Object.values(salesByMonth)

      setData(chartData)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-[300px]">Loading chart data...</div>
  }

  return (
    <ChartContainer
      config={{
        total: {
          label: "Sales Value ($)",
          color: "hsl(var(--chart-1))",
        },
        count: {
          label: "Number of Sales",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="var(--color-total)"
            fill="var(--color-total)"
            fillOpacity={0.2}
            yAxisId="left"
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--color-count)"
            fill="var(--color-count)"
            fillOpacity={0.2}
            yAxisId="right"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
