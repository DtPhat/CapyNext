'use client'
import React from 'react'
import SearchBar from '../ui/common/searchbar'
import { Select, Option, Button } from "@material-tailwind/react";
import { PlusIcon } from '@heroicons/react/24/solid';
import CollectionCard from '../ui/collection/card';
import { CreateCollection } from '../ui/collection/create';
export default function Collections() {
 
  return (
    <section className="px-16 py-8 flex flex-col gap-4 w-full">
      <div className='grid grid-cols-2'>
        <h1 className='text-2xl font-semibold '>Manage Your Collections</h1>
        <div>
          <SearchBar placeholder="Search collection..." />
        </div>

      </div>
      <div className='text-lg'>2 collections | 40 Saved Words</div>
      <CreateCollection />
      <div className="pt-4">
        <div className='w-52'>
          <Select label='Sort by' className='border'>
            <Option>Name (A-Z)</Option>
            <Option>Name (Z-A)</Option>
            <Option>Count (ASC)</Option>
            <Option>Count (DESC)</Option>
          </Select>
        </div>
      </div>
      <div className='flex flex-wrap gap-4'>
        <CollectionCard />
        <CollectionCard />
      </div>
    </section>
  )
}

