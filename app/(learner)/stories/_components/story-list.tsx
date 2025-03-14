
import React from 'react'
// import { storyList } from "@/lib/placeholders";
import StoryCard from "./card";
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';
import { PaginatedData, Story } from '@/lib/definitions';
import { getStories } from '../_lib/actions';
import NoData from '@/components/no-data';
import { PaginationWrapper } from '@/components/pagination';

interface StorylistProps {
  title?: string
  category?: string
  level?: string
  page?: number
  size?: number
}


const StoryList = async ({
  title = '',
  category = '',
  level = '',
  page = 1,
  size = 10,
}: StorylistProps) => {
  const result = await getStories(title, level, category, page, size);
  if (result === null) {
    return <NoData />;
  }
  const { data: stories, pagination } = result;
  return (
    <>
      {!stories.length ? (
        <NoData />
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link href={`/stories/${story._id}`} key={story._id}>
              <StoryCard data={story} />
            </Link>
          ))}
        </div>
      )}
      {stories.length && (
        <PaginationWrapper
          currentPage={page}
          totalPages={pagination?.totalPages || 1}
          searchParams={{ title, category, level, page, size }}
        />
      )}
    </>
  );
};

export default StoryList
