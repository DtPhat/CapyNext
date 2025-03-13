import React from 'react'
import VideoCard from './card'
import { getVideos } from '../_lib/actions';
import { PaginatedData, Video } from '@/lib/definitions'
import NoData from '@/components/no-data'
import { PaginationWrapper } from '@/components/pagination';

interface VideoListProps {
  title?: string
  category?: string
  level?: string
  page?: number
  size?: number
}

const VideoList = async (videoListProps: VideoListProps) => {
  const { title, category, level, page = 1, size = 9 } = videoListProps;

  const { data: videos = [], pagination }: PaginatedData<Video> = await getVideos(title, level, category, page, size);
  console.log(videos)
  return (
    <>
      {
        !videos?.length
          ? <NoData />
          : (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {
                  videos?.map(item =>
                    <VideoCard key={item._id} data={item} />
                  )
                }
              </div>
              <PaginationWrapper
                currentPage={page}
                totalPages={pagination?.totalPages || 1}
                searchParams={videoListProps as Record<string, string>}
              />
            </div>
          )
      }
    </>
  )
}

export default VideoList