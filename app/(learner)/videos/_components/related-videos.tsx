import { BASE_URL } from '@/lib/constants';
import { Story, Video } from '@/lib/definitions';
import Link from 'next/link';
import React from 'react'
import { MiniVideoCard } from './card';
import { getVideos } from '@/lib/actions/videos';


const RelatedVideos = async ({ currentId }: { currentId: string }) => {
  const response = await getVideos("", "", "", 1, 4)
  const videoList: Video[] = response
  return (
    <div className="grid grid-cols-3 gap-4">
      {
        videoList?.map(item =>
          item._id != currentId ? < MiniVideoCard key={item._id} data={item} /> : null
        )
      }
    </div>
  )
}

export default RelatedVideos