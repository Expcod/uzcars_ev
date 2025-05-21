import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { AddSaleForm } from "@/components/forms/add-sale-form"

export default async function SalesPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: sales } = await supabase.from("sales").select(`
      id,
      sale_date,
      sale_price,
      owner:owners(id, first_name, last_name),
      car:cars(id, brand, model)
    `)

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:ml-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
        <AddSaleForm />
      </div>
      <div className="border rounded-md">
        <DataTable columns={columns} data={sales || []} />
      </div>
    </div>
  )
}
