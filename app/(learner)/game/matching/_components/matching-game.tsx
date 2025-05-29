'use client';
import { GameContext } from '@/app/(learner)/game/_lib/context';
import { splitAndShuffleCollectionForMatchingGame } from '@/app/(learner)/game/_lib/utils';
import NoData from '@/components/sections/no-data';
import { RectangleSkeleton } from '@/components/sections/skeleton';
import { toast } from '@/components/ui/use-toast';
import {
  IconButton,
  Tooltip,
  Typography
} from '@material-tailwind/react';
import { delay } from 'lodash';
import { Heart, RotateCcw } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import CorrectAnswerFooter from '../../_components/correct-answer-footer';
import WrongAnswerFooter from '../../_components/wrong-answer-footer';
import MatchingGameCard from './matching-card';
const MatchingGame = () => {
  const { chosenCollection } = useContext(GameContext);

  const { data, isLoading, isValidating } = useSWR('/vocabularies/' + chosenCollection?._id)

  const [shouldWait, setShouldWait] = useState<boolean>(false);

  const [shuffledSourceTexts, setShuffledSourceTexts] = useState<
    { id: string; text: string }[]
  >([]);
  const [shuffledTranslations, setShuffledTranslations] = useState<
    { id: string; text: string }[]
  >([]);

  const [selectedSourceCards, setSelectedSourceCards] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [selectedTranslationCards, setSelectedTranslationCards] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const [numberOfQuestionAnswered, setNumberOfQuestionAnswered] = useState(0);
  const [toggleLevelReset, setToggleLevelReset] = useState<boolean>(false);
  const [numberOfLives, setNumberOfLives] = useState(5);

  const handleSelectSourceCard = (item: { id: string; text: string }) => {
    if (selectedTranslationCards !== null && selectedSourceCards !== null)
      return;
    if (selectedSourceCards?.id === item.id) {
      setSelectedSourceCards(null);
    } else {
      setSelectedSourceCards(item);
    }
  };

  const handleSelectTranslationCard = (item: {
    id: string;
    text: string;
  }) => {
    if (selectedTranslationCards !== null && selectedSourceCards !== null)
      return;

    if (selectedTranslationCards?.id === item.id) {
      setSelectedTranslationCards(null);
    } else {
      setSelectedTranslationCards(item);
    }
  };

  const resetChosenCard = () => {
    setSelectedTranslationCards(null);
    setSelectedSourceCards(null);
  };

  const resetCurrentLevel = () => {
    setSelectedTranslationCards(null);
    setSelectedSourceCards(null);
    setNumberOfQuestionAnswered(0);
    setShouldWait(false);
    setNumberOfLives(5);
    setToggleLevelReset((prev) => !prev);
  };

  const createNewGame = () => {
    resetCurrentLevel();
    shuffledData()
    toast({
      title: "Reset!",
      description: "New game was created!",
    })
  }

  // const nextQuestionSet = () => {
  //   setSelectedTranslationCards(null);
  //   setSelectedSourceCards(null);
  //   setNumberOfQuestionAnswered(0);
  //   setNumberOfLives(5);
  //   setShouldWait(false);
  //   setToggleLevelReset((prev) => !prev);
  //   shuffledData();
  // };

  const shuffledData = () => {
    const shuffledData = splitAndShuffleCollectionForMatchingGame(data);
    setShuffledSourceTexts(shuffledData.shuffledSourceTexts);
    setShuffledTranslations(shuffledData.shuffledTranslations);
  };

  useEffect(() => {
    if (!data) return;
    shuffledData();
  }, [data]);

  useEffect(() => {
    setShouldWait(true);
    if (selectedSourceCards !== null && selectedTranslationCards !== null) {
      if (selectedSourceCards.id === selectedTranslationCards.id) {
        setNumberOfQuestionAnswered((prev) => prev + 1);
      } else {
        if (numberOfLives > 0) {
          setNumberOfLives((prev) => prev - 1);
        }
      }
      delay(() => resetChosenCard(), 400);
    }
    setShouldWait(false);
  }, [selectedSourceCards, selectedTranslationCards]);

  if (isLoading) return <RectangleSkeleton />;

  if (!data?.length) return (
    <NoData 
    text='The collection does not have enough vocabulary. Please add more
		or select another collection!'/>
  );

  return (
    <>
      <div className='w-full relative '>
        {/* <Card className='w-full mb-4'>
          <CardBody className='h-full p-0'>
            
          </CardBody>
        </Card> */}
        <div className='flex justify-between mb-4 items-center'>
          <Tooltip content="Reset">
            <IconButton
              onClick={createNewGame}
              variant='text'
              className='text-primary'
              size='sm'
            >
              <RotateCcw />
            </IconButton>
          </Tooltip>
          <Typography
            variant='h5'
            className='mb-2 text-center'
          >
            Match the source text with its translation
          </Typography>
          <Typography
            variant='h2'
            key={numberOfLives}
            className='mb-2 text-center text-red-600 font-semibold text-xl animate-wiggle duration-200 repeat-[10] flex items-center justify-center gap-2'
          >
            {numberOfLives}{' '}
            <Heart color='#e53935' fill='#e53935' />
          </Typography>
        </div>
        <div className='grid grid-cols-2 grid-rows-1 gap-4  px-20'>
          <div className='flex flex-col  gap-4 items-center h-full justify-between'>
            {shuffledSourceTexts?.map((item) => (
              <MatchingGameCard
                key={item.text}
                shouldWait={shouldWait}
                item={item}
                toggleLevelReset={toggleLevelReset}
                selectedOne={selectedSourceCards}
                selectedTwo={selectedTranslationCards}
                onClick={handleSelectSourceCard}
              />
            ))}
          </div>
          <div className=' flex flex-col  gap-4 items-center justify-between h-full'>
            {shuffledTranslations?.map((item) => (
              <MatchingGameCard
                key={item.text}
                shouldWait={shouldWait}
                item={item}
                toggleLevelReset={toggleLevelReset}
                selectedOne={selectedSourceCards}
                selectedTwo={selectedTranslationCards}
                onClick={handleSelectTranslationCard}
              />
            ))}
          </div>
        </div>
      </div>
      <CorrectAnswerFooter
        shown={numberOfQuestionAnswered === shuffledSourceTexts?.length}
        onClick={createNewGame}
        title='You won! Do you want to play a new game?'
      />
      <WrongAnswerFooter
        shown={numberOfLives === 0}
        onClick={resetCurrentLevel}
        title='You lost!'
      />
    </>
  );
};

export default MatchingGame;
