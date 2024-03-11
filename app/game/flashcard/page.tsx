'use client'
import React from 'react'
import Flashcard from '@/app/ui/game/flashcard';
import TranslatableSection from '@/app/ui/translation/translatable-section';
import { Button, Card, CardBody, CardHeader, Chip, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, RectangleGroupIcon, RectangleStackIcon } from '@heroicons/react/24/solid';
import { CreateCollection } from '@/app/ui/collection/create';
import Link from 'next/link';
import Separator from '@/app/ui/common/separator';
import { collection } from '@/app/lib/placeholder-data';
const GamePage = () => {
  const data = {
    question: "string 1",
    answer: "string 2",
  };
  return (
    <div className=''>
      <Flashcard data={collection}/>
    </div>
  )
}

export default GamePage