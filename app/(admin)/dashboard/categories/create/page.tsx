"use client"

import { CategoryForm } from "../_components/category-form"

export default function CreateCategoryPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Create New Category</h1>
      <div className="grid gap-4">
        <CategoryForm />
      </div>
    </div>
  )
}
