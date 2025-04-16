import { StoryForm } from "../_components/story-form";

export default function CreateStoriesPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Create New Story</h1>
      <div className="grid gap-4">
        <StoryForm />
      </div>
    </div>
  )
} 