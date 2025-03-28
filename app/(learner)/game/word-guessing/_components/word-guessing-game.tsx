'use client';
import { GameContext } from '@/app/(learner)/game/_lib/context';
import { getWordGuessingData } from '@/app/(learner)/game/_lib/utils';
import NoData from '@/components/no-data';
import { RectangleSkeleton } from '@/components/skeleton';
import {
  Button,
  Card,
  CardBody,
  Typography
} from '@material-tailwind/react';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import CorrectAnswerFooter from '../../_components/correct-answer-footer';
import WrongAnswerFooter from '../../_components/wrong-answer-footer';
import WordGuessingAnswerCard from './word-guessing-answers';
import WordGuessingQuestion from './word-guessing-question';

const WordGuessingGame = () => {
  const { chosenCollection } = useContext(GameContext);

  const { data, isLoading } = useSWR('/vocabularies/' + chosenCollection?._id);

  const [step, setStep] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [fillerWords, setFillerWords] = useState<string[]>([]);
  const [questionSet, setQuestionSet] = useState<
    {
      index: number;
      question: string[];
      answer: string;
      isSentence: boolean;
    }[]
  >([]);

  const [question, setQuestion] = useState<{
    index: number;
    question: string[];
    answer: string;
    isSentence: boolean;
  }>();

  const [selectedCards, setSelectedCards] = useState<string>('');

  const handleSelectCard = (text: string) => {
    if (text === selectedCards) {
      setSelectedCards('');
    } else {
      setSelectedCards(text);
    }
  };

  const handleIncreaseStep = () => {
    if (step >= questionSet.length - 1) {
      setStep(0);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (selectedCards) {
      setDisabled(true);
    }
  };

  const handleNextQuestion = () => {
    setDisabled(false);
    setSelectedCards('');
    handleIncreaseStep();
  };

  useEffect(() => {
    if (data) {
      const questionsBank = getWordGuessingData(data);
      setQuestionSet(questionsBank.questions);
      setFillerWords(questionsBank.fillerAnswers);
    }
  }, [data]);

  useEffect(() => {
    setQuestion(questionSet[step])
  }, [step, questionSet])

  if (isLoading || !data) return <RectangleSkeleton />;

  if (data?.length < 5) return (
    <NoData text='The collection does not have enough vocabulary. Please add more
		or select another collection!'/>
  );


  return (
    <div className='w-full space-y-4 min-h-96'>
      <Typography
        variant='h5'
        color='blue-gray'
        className='mb-2 text-center'
      >
        Guess the missing words.
      </Typography>
      <Card className='w-full'>
        <CardBody className='flex justify-center items-center h-full'>
          {questionSet.length > 0 && question && (
            <WordGuessingQuestion
              questionSet={question}
            />
          )}
        </CardBody>
      </Card>
      {questionSet.length > 0 && question && (
        <div className={clsx(disabled && 'pointer-events-none')}>
          <WordGuessingAnswerCard
            onClick={handleSelectCard}
            selectedCard={selectedCards}
            fillerAnswers={fillerWords}
            questionData={question}
          />
        </div>
      )}
      <div className='w-full flex items-center justify-center gap-4 pt-2'>
        <Button
          onClick={handleSubmit}
          disabled={!!!selectedCards}
          color='green'
        >
          Check
        </Button>
        <Button
          onClick={handleNextQuestion}
          variant='outlined'
        >
          Skip
        </Button>
      </div>
      {disabled && (
        <>
          <CorrectAnswerFooter
            shown={selectedCards === question?.answer}
            onClick={handleNextQuestion}
          />
          <WrongAnswerFooter
            shown={selectedCards !== question?.answer}
            onClick={handleNextQuestion}
            subText={question?.answer}
          />
        </>
      )}
    </div>
  );
};

export default WordGuessingGame;
