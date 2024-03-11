"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SearchBar, { HomeSearchBar } from '../ui/common/searchbar'
import { MiniStoryCard } from '../ui/story/card'
import { MiniVideoCard } from '../ui/video/card'
import { Button } from '@material-tailwind/react'
import { ArrowRightCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { NavigateButtonIcon } from '../ui/common/button-icon'
import Separator from '../ui/common/separator'
import { storyList, videoList } from '../lib/placeholder-data'

const Home = () => {
  return (
    <div className='w-full relative'>
      <div className='absolute w-full h-[70vh] bg-black/50 bg-gradient-to-r from-primary/80 to-accent/40 '>
        <div className='font-semibold flex justify-center h-full px-16 flex-col tracking-wide text-white'>
          <div className='text-5xl'>LEARN & PLAY.</div>
          <div className='text-5xl pt-2'>Start a joyful journey mastering English.</div>
          <div className='font-normal mt-6 text-4xl'>Study English through most interesting stories and videos.</div>
          <div className='pt-12'>
            <HomeSearchBar placeholder='Search videos, stories,..' />
          </div>
        </div>
        <div className='mt-8 p-8 text-2xl font-semibold'>
          <div className='flex justify-between'>
            <h1 className='pb-4'>Trending videos</h1>
            <NavigateButtonIcon linkTo='/videos' text='Watch more' />
          </div>
          <div className='flex gap-8'>
            {
              videoList.map(item =>
                <MiniVideoCard data={item} key={item.title}/>
              )
            }
          </div>
        </div>
        <Separator />
        <div className='mt-8 p-8 text-2xl font-semibold'>
          <div className='flex justify-between'>
            <h1 className='pb-4'>Best collected stories</h1>
            <NavigateButtonIcon linkTo='/stories' text='Read more' />
          </div>
          <div className='flex gap-8'>
            {
              storyList.map(item => <MiniStoryCard data={item} key={item.title}/>)
            }
          </div>
        </div>
      </div>
      <div className='w-full h-full'>
        <Image src="/background.png" alt="background" className='w-full h-[70vh] object-cover' height={512} width={512} />
      </div>
    </div>
  )
}

export default Home