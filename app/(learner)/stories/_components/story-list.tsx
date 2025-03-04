
import React from 'react'
// import { storyList } from "@/lib/placeholders";
import StoryCard from "./card";
import Link from 'next/link';
import { BASE_URL } from '@/lib/constants';
import { Story } from '@/lib/definitions';
import { getStories } from '@/lib/actions/stories';
import NoData from '@/components/no-data';

const Storylist = async (
  { title = '', level = '', category = '' }: { title: string | undefined, level: string | undefined, category: string | undefined }) => {
  const response = await getStories(title, level, category)
  const storyList: Story[] = response

  return (
    <>
      {
        !storyList?.length
          ? <NoData />
          : <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {
              storyList?.map(item =>
                <StoryCard key={item._id} data={item} />
              )
            }
          </div>
      }
    </>
  )
}

export default Storylist
