import { VideoForm } from "../_components/video-form";

export default function UploadVideosPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Upload New Video</h1>
      <div className="grid gap-4">
        <VideoForm />
      </div>
    </div>
  )
} 