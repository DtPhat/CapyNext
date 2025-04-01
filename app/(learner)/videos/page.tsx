import Container from "@/components/layout/container";
import { FilterSelect, ClearFilter } from "@/components/filter-select";
import SearchBar from "@/components/search-bar";
import { PlayCircleIcon } from "lucide-react";
import { ENGLISH_LEVELS } from "@/lib/constants";
import VideoList from "./_components/video-list";
import { Suspense } from "react";
import Loading from "../stories/loading";
// import { PaginationWrapper } from "@/components/pagination";
export default async function Videos({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { title, category, level, page = 1, size = 9 } = await searchParams;

  return (
    <div className="w-full">
      <div className="relative">
        <img src={"https://wallpapercave.com/wp/wp10261833.jpg"}
          alt={""}
          className="w-full object-cover h-[16rem]"
        />
        <div className="absolute-center font-bold text-white text-4xl">
          <h1>Most interesting videos to learn.</h1>
        </div>
        <div className="absolute-center font-bold text-white text-4xl">
          <PlayCircleIcon className="w-48 h-48 opacity-15" />
        </div>
      </div>
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-16 border-b-2 pb-2 border-black/50">
          <div className="pt-2">
            <SearchBar placeholder="Search videos..." />
          </div>
          <div className="flex justify-end items-center gap-4">
            <FilterSelect name="category" checklist={["Science", "Culture", "Education", "Technology", "Entertainment", "History"]} />
            <FilterSelect name="level" checklist={ENGLISH_LEVELS} />
            <ClearFilter />
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <VideoList
            title={title}
            level={level}
            category={category}
            page={Number(page)}
            size={Number(size)}
          />
        </Suspense>
      </Container>
    </div>
  );
}