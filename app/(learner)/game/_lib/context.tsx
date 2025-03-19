import { Collection } from '@/lib/definitions';
import { Dispatch, SetStateAction, createContext } from 'react';

export const GameContext = createContext<GameContextProps>({
  chosenCollection: null,
  setChosenCollection: () => { },
});


interface GameContextProps {
  chosenCollection: Collection | null,
  setChosenCollection: Dispatch<SetStateAction<Collection | null>>
}
