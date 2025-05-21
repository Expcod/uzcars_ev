"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addSale } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

interface Car {
  id: number
  brand: string
  model: string
}

interface Owner {
  id: number
  first_name: string
  last_name: string
}

export function AddSaleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cars, setCars] = useState<Car[]>([])
  const [owners, setOwners] = useState<Owner[]>([])
  const [carId, setCarId] = useState("")
  const [ownerId, setOwnerId] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      // Fetch cars
      const { data: carsData } = await supabase.from("cars").select("id, brand, model")
      if (carsData) setCars(carsData)

      // Fetch owners
      const { data: ownersData } = await supabase.from("owners").select("id, first_name, last_name")
      if (ownersData) setOwners(ownersData)
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      formData.set("car_id", carId)
      formData.set("owner_id", ownerId)
      const result = await addSale(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Sale added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add sale",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DialogForm
      title="Add New Sale"
      description="Record a new vehicle sale in the database."
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-2">
        <Label htmlFor="car_id">Car</Label>
        <Select value={carId} onValueChange={setCarId}>
          <SelectTrigger id="car_id">
            <SelectValue placeholder="Select car" />
          </SelectTrigger>
          <SelectContent>
            {cars.map((car) => (
              <SelectItem key={car.id} value={car.id.toString()}>
                {car.brand} {car.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="owner_id">Owner</Label>
        <Select value={ownerId} onValueChange={setOwnerId}>
          <SelectTrigger id="owner_id">
            <SelectValue placeholder="Select owner" />
          </SelectTrigger>
          <SelectContent>
            {owners.map((owner) => (
              <SelectItem key={owner.id} value={owner.id.toString()}>
                {owner.first_name} {owner.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sale_date">Sale Date</Label>
          <Input id="sale_date" name="sale_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sale_price">Sale Price ($)</Label>
          <Input id="sale_price" name="sale_price" type="number" step="0.01" placeholder="45000" required />
        </div>
      </div>
    </DialogForm>
  )
}
