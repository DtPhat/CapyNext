import Container from "@/components/layout/container";
import TranslatableSection from "@/components/layout/translatable-section";
import { getStory } from "../_lib/actions";
import { Story as StoryType } from "@/lib/definitions";
import RelatedStories from "../_components/related-stories";
import { estimateReadingTime } from "../_lib/utils";

export default async function Story(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const story: StoryType = await getStory(params.id)
  return (
    <Container>
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-5">
          <img 
            src={story.display_image} 
            alt="Story background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 bg-white/85 p-4">
          <div className="flex justify-between gap-1 text text-black/90">
            <div>
              <p>Level: <span className="font-semibold">{story.level}</span></p>
              <p>Topic: <span className="font-semibold">{story.category}</span></p>
            </div>
            <div className="text-end">
              <p>Jan 08, 2024 · {estimateReadingTime(story.contents[0].text)} minute{story.contents[0].text.length > 1 ? 's' : ''} read</p>
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