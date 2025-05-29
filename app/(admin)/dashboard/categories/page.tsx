import { getCategories } from "./_lib/action"
import { columns } from "./_components/columns"
import { DataTable } from "../../_components/data-table"

export default async function CategoriesPage() {
  const data = await getCategories()

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Categories</h1>
      </div>
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  )
}
