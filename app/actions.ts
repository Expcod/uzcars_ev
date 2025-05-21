"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// Car actions
export async function addCar(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const car = {
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    year: Number.parseInt(formData.get("year") as string),
    price: Number.parseFloat(formData.get("price") as string),
    battery_capacity: Number.parseFloat(formData.get("battery_capacity") as string),
    charging_time: Number.parseFloat(formData.get("charging_time") as string),
    range_km: Number.parseInt(formData.get("range_km") as string),
  }

  const { error } = await supabase.from("cars").insert(car)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/cars")
  return { success: true }
}

// Owner actions
export async function addOwner(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const owner = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
  }

  const { error } = await supabase.from("owners").insert(owner)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/owners")
  return { success: true }
}

// Charging station actions
export async function addChargingStation(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const station = {
    station_name: formData.get("station_name") as string,
    location: formData.get("location") as string,
    charging_type: formData.get("charging_type") as string,
    power_kw: Number.parseFloat(formData.get("power_kw") as string),
  }

  const { error } = await supabase.from("charging_stations").insert(station)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/charging-stations")
  return { success: true }
}

// Sale actions
export async function addSale(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const sale = {
    car_id: Number.parseInt(formData.get("car_id") as string),
    owner_id: Number.parseInt(formData.get("owner_id") as string),
    sale_date: formData.get("sale_date") as string,
    sale_price: Number.parseFloat(formData.get("sale_price") as string),
  }

  const { error } = await supabase.from("sales").insert(sale)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/sales")
  return { success: true }
}

// Service actions
export async function addService(formData: FormData) {
  const supabase = createServerActionClient({ cookies })

  const service = {
    car_id: Number.parseInt(formData.get("car_id") as string),
    service_type: formData.get("service_type") as string,
    service_date: formData.get("service_date") as string,
    service_cost: Number.parseFloat(formData.get("service_cost") as string),
  }

  const { error } = await supabase.from("services").insert(service)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/services")
  return { success: true }
}
