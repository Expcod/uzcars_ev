"use client"

import type React from "react"

import { useState } from "react"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addOwner } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function AddOwnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      const result = await addOwner(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Owner added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add owner",
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
      title="Add New Owner"
      description="Add a new electric vehicle owner to the database."
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" name="first_name" placeholder="Akmal" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" name="last_name" placeholder="Rakhimov" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" placeholder="+998901234567" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" name="address" placeholder="Tashkent, Yakkasaroy" required />
      </div>
    </DialogForm>
  )
}
