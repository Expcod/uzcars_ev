"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addService } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

interface Car {
  id: number
  brand: string
  model: string
}

export function AddServiceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cars, setCars] = useState<Car[]>([])
  const [carId, setCarId] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCars() {
      const { data } = await supabase.from("cars").select("id, brand, model")
      if (data) setCars(data)
    }

    fetchCars()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      formData.set("car_id", carId)
      const result = await addService(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Service record added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add service record",
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
      title="Add New Service"
      description="Record a new vehicle service in the database."
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
        <Label htmlFor="service_type">Service Type</Label>
        <Input id="service_type" name="service_type" placeholder="Battery Replacement" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="service_date">Service Date</Label>
          <Input id="service_date" name="service_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service_cost">Service Cost ($)</Label>
          <Input id="service_cost" name="service_cost" type="number" step="0.01" placeholder="500" required />
        </div>
      </div>
    </DialogForm>
  )
}
