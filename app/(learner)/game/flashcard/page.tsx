'use client'
import Flashcard from "../_components/flash-card";
import { Collection, CollectionItem } from '@/lib/definitions';
import { GameContext } from '@/providers/game';
import { useContext } from 'react';
import useSWR from 'swr';
const GamePage = () => {

  const { chosenCollection } = useContext(GameContext)
  const { data } = useSWR<CollectionItem[]>('/vocabularies/' + chosenCollection?._id)
  return (
    <div className='text-black'>
      <Flashcard data={data || []} />
    </div>
  )
}

export default GamePage