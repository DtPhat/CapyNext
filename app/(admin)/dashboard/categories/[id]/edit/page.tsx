import { getCategory } from "../../_lib/action"
import { CategoryForm } from "../../_components/category-form"

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>
      <CategoryForm initialData={category} />
    </div>
  )
}
