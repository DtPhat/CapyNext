"use client"
import {
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  Square2StackIcon,
  Squares2X2Icon
} from '@heroicons/react/24/solid';
import {
  Card,
  CardHeader
} from '@material-tailwind/react';
import Link from 'next/link';
const OtherGames = () => {
  return (
    <div>
      <h1 className='font-semibold pb-2 text-lg'>Other games</h1>
      <div className='grid grid-cols-4 gap-8'>
        <Link href='/game/flashcard' className='space-y-2'>
          <Card className='overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group bg-foreground'>
            <Square2StackIcon className='w-40 h-40 text-accent' />
            <CardHeader
              shadow={false}
              color='transparent'
              className='text-center text-xl text-black font-semibold group-hover:text-primary'
            >
              Flash Card
            </CardHeader>
          </Card>
        </Link>
        <Link href='/game/matching' className='space-y-2'>
          <Card className='overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group bg-foreground'>
            <RectangleGroupIcon className='w-40 h-40 text-primary' />
            <CardHeader
              shadow={false}
              color='transparent'
              className='text-center text-xl text-black font-semibold group-hover:text-primary'
            >
              Matching
            </CardHeader>
          </Card>
        </Link>
        <Link href='/game/word-guessing' className='space-y-2'>
          <Card className='overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group bg-foreground'>
            <QuestionMarkCircleIcon className='w-40 h-40 text-red-700/50' />
            <CardHeader
              shadow={false}
              color='transparent'
              className='text-center text-xl text-black font-semibold group-hover:text-primary'
            >
              Word Guessing
            </CardHeader>
          </Card>
        </Link>
        <Link href='/game/multiple-choice' className='space-y-2'>
          <Card className='overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group bg-foreground'>
            <Squares2X2Icon className='w-40 h-40 text-orange-700/50' />
            <CardHeader
              shadow={false}
              color='transparent'
              className='text-center text-xl text-black font-semibold group-hover:text-primary'
            >
              Multiple Choice
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default OtherGames