"use client"

import type React from "react"

import { useState } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addChargingStation } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function AddChargingStationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chargingType, setChargingType] = useState("DC")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      formData.set("charging_type", chargingType)
      const result = await addChargingStation(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Charging station added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add charging station",
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
      title="Add New Charging Station"
      description="Add a new EV charging station to the database."
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-2">
        <Label htmlFor="station_name">Station Name</Label>
        <Input id="station_name" name="station_name" placeholder="EcoCharge" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="Tashkent City Mall" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="charging_type">Charging Type</Label>
          <Select value={chargingType} onValueChange={setChargingType}>
            <SelectTrigger id="charging_type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DC">DC</SelectItem>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="Wireless">Wireless</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="power_kw">Power (kW)</Label>
          <Input id="power_kw" name="power_kw" type="number" step="0.1" placeholder="50" required />
        </div>
      </div>
    </DialogForm>
  )
}
