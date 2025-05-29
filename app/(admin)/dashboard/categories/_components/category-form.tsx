'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Category } from "@/lib/definitions"
import { createCategory, updateCategory } from "../_lib/action"
import { useToast } from "@/components/ui/use-toast"

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type CategoryFormValues = z.infer<typeof categorySchema>

interface CategoryFormProps {
  initialData?: Category
}

export function CategoryForm({ initialData }: { initialData?: Category }) {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ? {
      name: initialData.name,
    } : {
      name: "",
    },
  })

  async function onSubmit(values: CategoryFormValues) {
    try {
      if (initialData) {
        await updateCategory(initialData._id, values)
        toast({
          title: "Success",
          description: "Category updated successfully",
        })
      } else {
        await createCategory(values)
        toast({
          title: "Success",
          description: "Category created successfully",
        })
      }
      router.push("/dashboard/categories")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Operation failed",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <Button type="submit">
        {initialData ? "Update Category" : "Create Category"}
      </Button>
    </form>
  )
}
