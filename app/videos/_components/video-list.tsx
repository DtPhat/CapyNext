import React from 'react'
import VideoCard from './card'
import { getVideos } from '@/lib/actions/videos'
import { Video } from '@/lib/definitions'
import NoData from '@/components/no-data'

const VideoList = async ({ title = '', level = '', category = '' }: { title: string | undefined, level: string | undefined, category: string | undefined }) => {
  const response = await getVideos(title, level, category)
  const videoList: Video[] = response
  return (
    <>
      {
        !videoList?.length
          ? <NoData />
          : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {
              videoList?.map(item =>
                <VideoCard key={item._id} data={item} />
              )
            }
          </div>
      }
    </>
  )
}

export default VideoList