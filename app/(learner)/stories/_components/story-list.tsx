
// import { storyList } from "@/lib/placeholders";
import { PaginationWrapper } from '@/components/sections/content-pagination';
import NoData from '@/components/sections/no-data';
import Link from 'next/link';
import { getStories } from '../_lib/actions';
import StoryCard from "./card";

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
