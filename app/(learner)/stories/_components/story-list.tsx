
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


const StoryList = async (storylistProps: StorylistProps) => {
  const { title, category, level, page = 1, size = 10 } = storylistProps;
  const { data: stories = [], pagination }: PaginatedData<Story> = await getStories(title, level, category, page, size);
  return (
    <>
      {!stories.length ? (
        <NoData />
      ) : (
        <div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Link href={`stories/${story._id}`} key={story._id}>
                <StoryCard data={story} />
              </Link>
            ))}
          </div>
          <PaginationWrapper
            currentPage={page}
            totalPages={pagination?.totalPages || 1}
            searchParams={storylistProps as Record<string, string>}
          />
        </div>
      )}
    </>
  );
};

export default StoryList
