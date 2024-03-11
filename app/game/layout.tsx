'use client'
import React from 'react'
import Flashcard from '@/app/ui/game/flashcard';
import TranslatableSection from '@/app/ui/translation/translatable-section';
import { Button, Card, CardBody, CardHeader, Chip, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, QuestionMarkCircleIcon, RectangleGroupIcon, RectangleStackIcon, Square2StackIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import { CreateCollection } from '@/app/ui/collection/create';
import Link from 'next/link';
import Separator from '@/app/ui/common/separator';
const GameLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='px-16 py-8 flex flex-col gap-4 w-full'>
      <div className="text-lg w-full">
        <Menu offset={10}>
          <div className='flex justify-center items-center gap-4'>
            <div className='text-lg font-bold'>PLAY WITH: </div>
            <MenuHandler>
              <Button variant='outlined' className="px-2 py-1 border-black/50 border-2 rounded-lg flex items-center gap-1 text-primary border-primary">
                <span className="normal-case text-lg">Academic Writing</span>
                <ChevronDownIcon className="w-6 h-6" />
              </Button>
            </MenuHandler>
          </div>
          <MenuList className="p-1 text-black bg-foreground flex flex-col gap-1 min-w-52">
            <MenuItem className="flex gap-4 border-2 items-center justify-between py-1 font-semibold">
              <span>Family</span>
              <Chip value="5" size="sm" variant="ghost" className="rounded-full" />
            </MenuItem>
            <MenuItem className="flex gap-4 border-2 items-center justify-between py-1 font-semibold">
              <span>Academic Writing</span>
              <Chip value="11" size="sm" variant="ghost" className="rounded-full" />
            </MenuItem>
            <MenuItem className="flex gap-4 border-2 items-center justify-between py-1 font-semibold">
              <span>Sports</span>
              <Chip value="11" size="sm" variant="ghost" className="rounded-full" />
            </MenuItem>
          </MenuList>
        </Menu>
        <Separator />
      </div>
      <div className='w-full'>
        <TranslatableSection>
          {children}
        </TranslatableSection>
      </div>
      <Separator />
      <div>
        <h1 className="font-semibold pb-2 text-lg">Other games</h1>
        <div className="grid grid-cols-4 gap-8">
          <Link href='/game/flashcard' className="space-y-2">
            <Card className="overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group">
              <Square2StackIcon className='w-40 h-40 text-accent' />
              <CardHeader
                shadow={false}
                color="transparent"
                className="text-center text-xl text-black font-semibold group-hover:text-primary"
              >
                Flash Card
              </CardHeader>
            </Card>
          </Link>
          <Link href='/game/matching' className="space-y-2">
            <Card className="overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group">
              <RectangleGroupIcon className='w-40 h-40 text-primary' />
              <CardHeader
                shadow={false}
                color="transparent"
                className="text-center text-xl text-black font-semibold group-hover:text-primary"
              >
                Matching
              </CardHeader>
            </Card>
          </Link>
          <Link href='/game/matching' className="space-y-2">
            <Card className="overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group">
              <QuestionMarkCircleIcon className='w-40 h-40 text-red-700/50' />
              <CardHeader
                shadow={false}
                color="transparent"
                className="text-center text-xl text-black font-semibold group-hover:text-primary"
              >
                Word Guessing
              </CardHeader>
            </Card>
          </Link>
          <Link href='/game/matching' className="space-y-2">
            <Card className="overflow-hidden hover:bg-accent/10 p-4 flex justify-center flex-col items-center gap-8 group">
              <Squares2X2Icon className='w-40 h-40 text-orange-700/50' />
              <CardHeader
                shadow={false}
                color="transparent"
                className="text-center text-xl text-black font-semibold group-hover:text-primary"
              >
                Multiple Choice
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameLayout