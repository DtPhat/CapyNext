"use server"

import { BASE_URL } from "@/lib/constants"
import { Category } from "@/lib/definitions"

export async function getCategories(): Promise<Category[]> {
  try {
  const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText)
    }
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
