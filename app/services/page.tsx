import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { AddServiceForm } from "@/components/forms/add-service-form"

export default async function ServicesPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: services } = await supabase.from("services").select(`
      id,
      service_type,
      service_date,
      service_cost,
      car:cars(id, brand, model)
    `)

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:ml-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <AddServiceForm />
      </div>
      <div className="border rounded-md">
        <DataTable columns={columns} data={services || []} />
      </div>
    </div>
  )
}
