import { BASE_URL } from '@/lib/constants';
import { PaginatedData, Story } from '@/lib/definitions';
import Link from 'next/link';
import React from 'react'
import { MiniStoryCard } from './card';
import { getStories } from '../_lib/actions';

const RelatedStories = async ({ currentId }: { currentId: string }) => {
  const response = await getStories("", "", "", 1, 4)
  const storyList = response?.data || []
  return (
    <div className="grid grid-cols-4 gap-4">
      {
        storyList?.map(item =>
          item._id != currentId ? <MiniStoryCard key={item._id} data={item} /> : null
        )
      }
    </div>
  )
}

export default RelatedStories