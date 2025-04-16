import React from 'react'
import VideoCard from './card'
import { getVideos } from '../_lib/actions';
import { PaginatedData, Video } from '@/lib/definitions'
import NoData from '@/components/sections/no-data'
import { PaginationWrapper } from '@/components/sections/content-pagination';
import Link from 'next/link';

interface VideoListProps {
  title?: string
  category?: string
  level?: string
  page?: number
  size?: number
}

const VideoList = async ({
  title = '',
  category = '',
  level = '',
  page = 1,
  size = 9,
}: VideoListProps) => {
  const result = await getVideos(title, level, category, page, size);
  if (result === null) {
    return <NoData />;
  }
  const { data: videos, pagination } = result;
  return (
    <>
      {videos?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link href={`/videos/${video._id}`} key={video._id}>
              <VideoCard data={video} />
            </Link>
          ))}
        </div>
      ) : (
        <NoData />
      )}
      {videos?.length && (
        <PaginationWrapper
          currentPage={page}
          totalPages={Number(pagination?.totalPages) || 1}
          searchParams={{ title, category, level, page, size }}
        />
      )}
    </>
  );
};

export default VideoList