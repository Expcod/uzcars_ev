"use client"

import type React from "react"

import { useState } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addCar } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function AddCarForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      const result = await addCar(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Car added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add car",
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
      title="Add New Car"
      description="Add a new electric vehicle to the database."
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" placeholder="Tesla" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" placeholder="Model S" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input id="year" name="year" type="number" placeholder="2023" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="45000" required />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="battery_capacity">Battery (kWh)</Label>
          <Input id="battery_capacity" name="battery_capacity" type="number" step="0.1" placeholder="75" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="charging_time">Charging Time (h)</Label>
          <Input id="charging_time" name="charging_time" type="number" step="0.1" placeholder="1.5" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="range_km">Range (km)</Label>
          <Input id="range_km" name="range_km" type="number" placeholder="500" required />
        </div>
      </div>
    </DialogForm>
  )
}
