import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Car, Users, Zap, ShoppingCart, Wrench } from "lucide-react"
import StatsCard from "@/components/stats-card"
import CarsChart from "@/components/cars-chart"
import SalesChart from "@/components/sales-chart"
import RecentSales from "@/components/recent-sales"

export default async function Dashboard() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Fetch counts for each table
  const { count: carsCount } = await supabase.from("cars").select("*", { count: "exact", head: true })

  const { count: ownersCount } = await supabase.from("owners").select("*", { count: "exact", head: true })

  const { count: stationsCount } = await supabase.from("charging_stations").select("*", { count: "exact", head: true })

  const { count: salesCount } = await supabase.from("sales").select("*", { count: "exact", head: true })

  const { count: servicesCount } = await supabase.from("services").select("*", { count: "exact", head: true })

  // Calculate total sales value
  const { data: salesData } = await supabase.from("sales").select("sale_price")

  const totalSalesValue = salesData?.reduce((sum, sale) => sum + Number.parseFloat(sale.sale_price), 0) || 0

  // Calculate average battery capacity
  const { data: carsData } = await supabase.from("cars").select("battery_capacity")

  const avgBatteryCapacity = carsData?.length
    ? carsData.reduce((sum, car) => sum + Number.parseFloat(car.battery_capacity), 0) / carsData.length
    : 0

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:ml-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4 w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview" className="flex-1 md:flex-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 md:flex-none">
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Cars"
              value={carsCount || 0}
              description="Electric vehicles in database"
              icon={Car}
            />
            <StatsCard title="Total Owners" value={ownersCount || 0} description="Registered EV owners" icon={Users} />
            <StatsCard
              title="Charging Stations"
              value={stationsCount || 0}
              description="Available across Uzbekistan"
              icon={Zap}
            />
            <StatsCard
              title="Total Sales"
              value={`$${totalSalesValue.toLocaleString()}`}
              description="Value of all EV sales"
              icon={ShoppingCart}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Cars by Brand</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CarsChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>EV Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Car className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Average Battery Capacity</p>
                      <p className="text-xl font-bold">{avgBatteryCapacity.toFixed(2)} kWh</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Wrench className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Total Services</p>
                      <p className="text-xl font-bold">{servicesCount || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Total Sales</p>
                      <p className="text-xl font-bold">{salesCount || 0}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
