import { getStory } from "../../_lib/action"
import { StoryForm } from "../../_components/story-form"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditStoryPage({ params }: PageProps) {
  const story = await getStory(params.id)

  if (!story) {
    return <div>Story not found</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Story</h1>
      </div>
      <StoryForm initialData={story} />
    </div>
  )
} 