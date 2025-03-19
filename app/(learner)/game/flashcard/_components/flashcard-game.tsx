'use client'
import CardSet from "./card-set";
import { Collection, CollectionItem } from '@/lib/definitions';
import { GameContext } from '@/app/(learner)/game/_lib/context';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import { RectangleSkeleton } from "@/components/skeleton";
import NoData from "@/components/no-data";
const FlashCardGame = () => {
  const { chosenCollection } = useContext(GameContext)
  const { data, isLoading } = useSWR<CollectionItem[]>('/vocabularies/' + chosenCollection?._id)

  if (isLoading) return <RectangleSkeleton />;

  if (!data?.length) return (
    <NoData text='The collection is empty. Please add more or select another collection!' />
  );

  return (
    <div>
      <CardSet initialData={data || []} />
    </div>
  )
}

export default FlashCardGame