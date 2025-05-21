import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { AddCarForm } from "@/components/forms/add-car-form"

export default async function CarsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: cars } = await supabase.from("cars").select("*")

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:ml-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cars</h2>
        <AddCarForm />
      </div>
      <div className="border rounded-md">
        <DataTable columns={columns} data={cars || []} />
      </div>
    </div>
  )
}
