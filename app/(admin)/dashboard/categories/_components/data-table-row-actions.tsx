"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import React from "react"
import { Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Category } from "@/lib/definitions"
import { deleteCategory } from "../_lib/action"
import { useToast } from "@/components/ui/use-toast"
import { ConfirmDialog } from "@/app/(admin)/_components/confirm-dialog"

interface DataTableRowActionsProps {
  row: Row<Category>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const category = row.original

  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const handleDelete = async () => {
    try {
      await deleteCategory(category._id)
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/categories/${category._id}/edit`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => setConfirmOpen(true)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ConfirmDialog
      open={confirmOpen}
      onOpenChange={setConfirmOpen}
      onConfirm={handleDelete}
      title="Delete Category"
      description={`Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`}
      confirmText="Delete Category"
    />
    </>
  )
} 