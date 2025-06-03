"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Story, Category } from "@/lib/definitions"
import { updateStory, createStory } from "../_lib/action"
import { getCategories } from "@/app/(learner)/categories/_lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { LEVEL_NUMBERS } from "@/lib/constants"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.object({
    _id: z.string().min(1, "Category ID is required"),
    name: z.string().min(1, "Category name is required")
  }),
  level: z.string().min(1, "Level is required"),
  author: z.string().min(1, "Author is required"),
  isPremium: z.boolean(),
  display_image: z.string().min(1, "Display image URL is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
})

interface StoryFormProps {
  initialData?: Story
}

export function StoryForm({ initialData }: StoryFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category,
      level: initialData?.level || "",
      author: initialData?.author || "",
      isPremium: initialData?.isPremium || false,
      display_image: initialData?.display_image || "",
      description: initialData?.description || "",
      content: initialData?.contents[0].text || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        ...values,
        category: values.category._id
      }
      
      if (initialData) {
        await updateStory(initialData._id, payload)
        toast({ title: "Success", description: "Story updated successfully" })
      } else {
        await createStory(payload)
        toast({ title: "Success", description: "Story created successfully" })
      }
      router.push("/dashboard/stories")
      router.refresh()
    } catch (error) {
      toast({ title: "Error", description: "Operation failed", variant: "destructive" })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Story title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => {
                  // Convert string ID to Category object for form state
                  const selectedCategory = categories.find(cat => cat._id === value);
                  field.onChange(selectedCategory || { _id: '', name: '' });
                }} defaultValue={field.value?._id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <div className="text-gray-500 px-2 py-1">Loading categories...</div>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    Object.entries(LEVEL_NUMBERS).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {key}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPremium"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Premium</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Display image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Story description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Story content"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{initialData ? "Save Changes" : "Create Story"}</Button>
        </div>
      </form>
    </Form>
  )
}
