import Container from "@/components/container";
import TranslatableSection from "@/components/layout/translatable-section";
import { getStory } from "../_lib/actions";
import { Story } from "@/lib/definitions";
import RelatedStories from "../_components/related-stories";
import { estimateReadingTime } from "../_lib/utils";
export default async function Story({ params }: { params: { id: string } }) {
  const story: Story = await getStory(params.id)
  return (
    <Container>
      <div>
        <div className="flex justify-between gap-1 text text-black/90">
          <div>
            <p>Level: <span className="font-semibold">{story.level}</span></p>
            <p>Topic: <span className="font-semibold">{story.category}</span></p>
          </div>
          <div className="text-end">
            <p>Jan 08, 2024 · {estimateReadingTime(story.contents[0].text)} minute{story.contents[0].text.length > 1 ? 's' : ''} read</p>
          </div>
        </div>
        <h1 className="text-xl text-center font-semibold mb-4 text-black">{story.title}</h1>
        <TranslatableSection>
          <p className="text-lg whitespace-pre-line">
            {story.contents[0].text}
          </p>
        </TranslatableSection>
      </div>
      <hr className="mt-16 mb-4 border-black/20" />
      <div>
        <h1 className="font-semibold pb-2">Similar stories</h1>
        <RelatedStories currentId={params.id} />
      </div>
    </Container>
  );
}