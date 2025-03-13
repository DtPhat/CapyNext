"use client"
import Container from '@/components/container';
import SearchBar from '@/components/search-bar';
import { Collection } from '@/lib/definitions';
import useSWR from 'swr';
import CollectionCard from './_components/card';
import { CreateCollection } from '@/components/collection';
import { CardSkeleton, CollectionCardSkeleton } from '@/components/skeleton';
import NoData from '@/components/no-data';

export default function Collections() {
  const { data, isLoading, error } = useSWR('/collections')
  const collectionList: Collection[] = data || []
  const countTotal = collectionList.reduce((total, item) => total + (item.totalVocab || 0), 0)
  return (
    <Container>
      <div className='grid grid-cols-2'>
        <h1 className='text-2xl font-semibold '>Manage Your Collections</h1>
        <div>
          <SearchBar placeholder="Search collection..." />
        </div>
      </div>
      {/* {
        <NoData />
      } */}
      <div className='text-lg'>{
        isLoading
          ? 'Loading...'
          : error
            ? 'Failed to load data'
            : `${collectionList.length} collections | ${countTotal} Saved Words`
      }</div>
      <CreateCollection />
      <div className="pt-4">
        <div className='w-52'>
          {/* <Select label='Sort by' className='border'>
            <Option>Name (A-Z)</Option>
            <Option>Name (Z-A)</Option>
            <Option>Count (ASC)</Option>
            <Option>Count (DESC)</Option>
          </Select> */}
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {
          isLoading
            ? Array.from({ length: 3 }).map((_, index) =>
              <CollectionCardSkeleton key={index} />
            )
            : !collectionList?.length
              ? <NoData text='No collections added!' />
              : collectionList.map(collection =>
                <CollectionCard
                  key={collection._id}
                  collection={collection}
                />
              )
        }
      </div>
    </Container >
  )
}

