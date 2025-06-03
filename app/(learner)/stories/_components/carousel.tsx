'use client'
import { NavigateButtonIcon } from '@/components/button-icon';
import { Level, Story } from '@/lib/definitions';
import {
  Card,
  CardBody,
  CardFooter, Carousel, Typography
} from "@material-tailwind/react";
import { BookOpen, TagIcon } from 'lucide-react';
import { estimateReadingTime } from '../_lib/utils';
import { LEVEL_NUMBERS } from '@/lib/constants';
import { useRouter } from 'next/navigation'

const StoriesCarousel = ({ carouselData }: { carouselData?: Story[] }) => {
  const router = useRouter()
  return (
    <div className='w-full'>
      <Carousel transition={{ duration: 1 }} className="h-[18rem]" navigation={() => (null)} loop={true} autoplay={true}>
        {
          carouselData?.map((story) =>
            <div key={story._id} className='relative h-[18rem] group cursor-pointer' onClick={() => router.push(`/stories/${story._id}`)}>
              <img
                src={story.display_image}
                alt="image 1"
                className="h-full w-full object-cover blur-sm"
              />
              <div className='absolute-center flex rounded-md overflow-hidden gap-2 h-56'>
                <img
                  src={story.display_image}
                  alt=""
                  className='w-80 h-full object-cover'
                />
                <Card className='w-96 h-full bg-transparent shadow-none text-black'>
                  <CardBody className="flex flex-col gap-1 p-2 px-4">
                    <Typography className="text-lg font-semibold h-14" color="black">
                      {story.title}
                    </Typography>
                    <p className="text-xs">{story?.updatedAt} · {estimateReadingTime(story?.contents[0]?.text)} min read</p>
                    <Typography className="font-normal text-sm h-14">
                      <p className="line-clamp-3">
                        {story.description}
                      </p>
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-1 px-4 gap-2 flex flex-col">
                    <div className=''>
                      <div className="flex flex-wrap items-center gap-4 text-black">
                        <div className="flex items-center gap-2 justify-between">
                          <div className="bg-primary w-6 h-6 text-center rounded-md text-white">{LEVEL_NUMBERS[story.level as Level]}</div>
                          <div className="text-sm uppercase">
                            {story.level}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <TagIcon className="w-5 h-5" />
                          <span className="text-sm">
                            {story.category?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <NavigateButtonIcon text='Learn more' />
                    </div>
                  </CardFooter>
                </Card>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block ">
                <BookOpen className="w-28 h-28 opacity-15 text-black" />
              </div>
            </div>
          )
        }
      </Carousel>
    </div>
  )
}

export default StoriesCarousel
