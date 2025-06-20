import Container from "@/components/layout/container";
import TranslatableSection from "@/components/layout/translatable-section";
import { getStory } from "../_lib/actions";
import { Story as StoryType } from "@/lib/definitions";
import RelatedStories from "../_components/related-stories";
import { estimateReadingTime } from "../_lib/utils";
import { convertDateFormat } from "@/lib/helpers/time";

export default async function Story(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const story: StoryType = await getStory(params.id)
  return (
    <Container>
      <div className="absolute inset-0 z-5">
        <img
          src={story.display_image}
          alt="Story background"
          className="w-full h-[calc(100%+4rem)] object-cover"
        />
      </div>
      <div className="rounded-md overflow-hidden z-10">
        {/* Background Image */}
        <div className="z-100 bg-white/90 p-4 border rounded-md">
          <div className="flex justify-between gap-1 text text-black/90">
            <div>
              <p>Level: <span className="font-semibold">{story.level}</span></p>
              <p>Topic: <span className="font-semibold">{story.category?.name}</span></p>
            </div>
            <div className="text-end">
              <p>{convertDateFormat(story.updatedAt)} · {estimateReadingTime(story.contents[0].text)} minute{story.contents[0].text.length > 1 ? 's' : ''} read</p>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl text-center font-semibold mb-6 text-black">{story.title}</h1>
          <TranslatableSection>
            <p className="text-lg whitespace-pre-line">
              {story.contents[0].text}
            </p>
          </TranslatableSection>
        </div>
      </div>
      <hr className="mt-16 mb-4 border-black/20" />
      <div>
        <h1 className="font-semibold pb-2">Similar stories</h1>
        <RelatedStories currentId={params.id} />
      </div>
    </Container>
  );
}