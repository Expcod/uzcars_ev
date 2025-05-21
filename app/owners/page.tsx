import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { AddOwnerForm } from "@/components/forms/add-owner-form"

export default async function OwnersPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: owners } = await supabase.from("owners").select("*")

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:ml-64">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Owners</h2>
        <AddOwnerForm />
      </div>
      <div className="border rounded-md">
        <DataTable columns={columns} data={owners || []} />
      </div>
    </div>
  )
}
