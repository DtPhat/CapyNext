import { ClearFilter, FilterSelect } from "@/components/filter-select";
import Container from "@/components/layout/container";
import SearchBar from "@/components/search-bar";
import { ENGLISH_LEVELS } from "@/lib/constants";
import StoriesCarousel from "./_components/carousel";
import StoryList from "./_components/story-list";
import { getStory } from "./_lib/actions";
import { getCategories } from "../categories/_lib/actions";

export default async function Stories({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const [carouselData1, carouselData2, carouselData3, categories] = await Promise.all([
    getStory('6657ecb46e94f467a7d5f1d0'),
    getStory('6657ecd96e94f467a7d5f1d1'),
    getStory('6656abf899f29ac57156ce09'),
    getCategories()
  ])

  const { title, category, level, page = 1, size = 9 } = await searchParams;

  return (
    <div className="w-full">
      <StoriesCarousel
        carouselData={[carouselData1, carouselData2, carouselData3]}
      />
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-16 border-b-2 pb-2 border-black/50">
          <div className="pt-2">
            <SearchBar placeholder="Search stories..." />
          </div>
          <div className="flex justify-end items-center gap-4">
            <FilterSelect name="category" checklist={categories} />
            <FilterSelect name="level" checklist={ENGLISH_LEVELS} />
            <ClearFilter />
          </div>
        </div>
        <StoryList
          title={title}
          level={level}
          category={category}
          page={Number(page)}
          size={Number(size)}
        />
      </Container>
    </div>
  );
}