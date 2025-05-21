import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { AddChargingStationForm } from "@/components/forms/add-charging-station-form"

export default async function ChargingStationsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: stations } = await supabase.from("charging_stations").select("*")

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:ml-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Charging Stations</h2>
        <AddChargingStationForm />
      </div>
      <div className="border rounded-md">
        <DataTable columns={columns} data={stations || []} />
      </div>
    </div>
  )
}
