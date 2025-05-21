"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Car = {
  id: number
  brand: string
  model: string
  year: number
  price: number
  battery_capacity: number
  charging_time: number
  range_km: number
}

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "battery_capacity",
    header: "Battery (kWh)",
    cell: ({ row }) => {
      const value = Number.parseFloat(row.getValue("battery_capacity"))
      return <div>{value.toFixed(1)} kWh</div>
    },
  },
  {
    accessorKey: "charging_time",
    header: "Charging Time (h)",
    cell: ({ row }) => {
      const value = Number.parseFloat(row.getValue("charging_time"))
      return <div>{value.toFixed(2)} h</div>
    },
  },
  {
    accessorKey: "range_km",
    header: "Range (km)",
    cell: ({ row }) => {
      return <div>{row.getValue("range_km")} km</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const car = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(car.id.toString())}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
