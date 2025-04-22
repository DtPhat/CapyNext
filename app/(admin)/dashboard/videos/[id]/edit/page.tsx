import { getVideo } from "../../_lib/action"
import { VideoForm } from "../../_components/video-form"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditVideoPage({ params }: PageProps) {
  const video = await getVideo(params.id)

  if (!video) {
    return <div>Video not found</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Video</h1>
      </div>
      <VideoForm initialData={video} />
    </div>
  )
} 