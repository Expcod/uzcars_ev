"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CarsChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("cars").select("brand, model")

      if (error) {
        console.error("Error fetching car data:", error)
        return
      }

      // Count cars by brand
      const brandCounts = data.reduce(
        (acc, car) => {
          acc[car.brand] = (acc[car.brand] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      // Convert to chart data format
      const chartData = Object.entries(brandCounts).map(([brand, count]) => ({
        brand,
        count,
      }))

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
        count: {
          label: "Number of Cars",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="brand" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
