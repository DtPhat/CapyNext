import TranslatableSection from '@/components/layout/translatable-section';
import RelatedVideos from '../_components/related-videos';
import VideoPlayer from '../_components/video-player';
const Video = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <div className='w-full px-16 py-8 max-w-7xl'>
      <TranslatableSection>
        {<VideoPlayer id={params.id} />}
      </TranslatableSection>
      <hr className="mt-16 mb-4 border-black/20" />
      <div>
        <h1 className="font-semibold pb-2">Similar videos</h1>
        <RelatedVideos currentId={params.id} />
      </div>
    </div>
  );
};

export default Video;


const TestSearchParams = async ({searchParams}: {searchParams: Promise<{id: string; name: string}>}) => {
  const {id, name} = await searchParams;
  console.log({id, name})
}