'use client'
import { NavigateButtonIcon } from '@/components/button-icon'
import Container from '@/components/layout/container'
import SearchBar from '@/components/search-bar'
import { VocabCardSkeleton } from '@/components/sections/skeleton'
import { Collection, CollectionItem } from '@/lib/definitions'
import useSWR from 'swr'
import { CreateVocab } from './create-vocab'
import VocabCard from './vocab-card'

export default function CollectionDetail({ id }: { id: string }) {
  const { data: collection, isLoading } = useSWR<Collection>(`/collections/` + id)
  const vocabularyList: CollectionItem[] = collection?.vocabularies || []
  return (
    <Container>
      {
        isLoading
          ? <div className='grid grid-cols-1 gap-4'>
            {
              Array.from({ length: 8 }).map((_, index) =>
                <VocabCardSkeleton key={index} />
              )
            }
          </div>
          : <div className='w-full flex flex-col justify-start text-xl gap-2'>
            <div className='grid grid-cols-2'>
              <div>
                <h1 className='text-2xl font-semibold '>{collection?.name}</h1>
                <h1 className='text-xl '>{collection?.description}</h1>
              </div>
              <div>
                <SearchBar placeholder="Search item..." />
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <div className='text-lg font-normal'>You've added {vocabularyList?.length || 0} vocabulary to this collection.</div>
              <NavigateButtonIcon linkTo="/game/flashcard" text="Go Practice" disabled={vocabularyList?.length === 0} />
            </div>
            {collection ? <CreateVocab collection={collection!} /> : null}
            <div>
              <div className='grid grid-cols-1'>
                {vocabularyList?.map(vocab =>
                  <VocabCard
                    key={vocab._id}
                    vocabulary={vocab}
                  />
                )}
              </div>
            </div>
          </div>
      }

    </Container >
  )
}
