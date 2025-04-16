import { getStory } from "../../_lib/action"
import { StoryForm } from "../../_components/story-form"

interface EditVideoPageProps {
  params: {
    id: string
  }
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
  const video = await getStory(params.id)

  if (!video) {
    return <div>Video not found</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Video</h1>
      </div>
      <StoryForm initialData={video} />
    </div>
  )
} 