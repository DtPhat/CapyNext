'use client';
import Loader from '@/components/loader';
import { splitAndShuffleCollectionForMatchingGame } from '@/lib/helpers/array';
import { GameContext } from '@/providers/game';
import {
	Card,
	CardBody,
	Typography
} from '@material-tailwind/react';
import { delay } from 'lodash';
import { Heart } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import CorrectAnswerFooter from '../_components/correct-answer-footer';
import WrongAnswerFooter from '../_components/wrong-answer-footer';
import MatchingGameCard from './_components/matching-game-card';
import { Collection } from '@/lib/definitions';

const Page = () => {
	const { chosenCollection } = useContext(GameContext);

  const { data } = useSWR('/vocabularies/' + chosenCollection?._id)

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

	const nextQuestionSet = () => {
		setSelectedTranslationCards(null);
		setSelectedSourceCards(null);
		setNumberOfQuestionAnswered(0);
		setNumberOfLives(5);
		setShouldWait(false);
		setToggleLevelReset((prev) => !prev);
		getShuffledData();
	};

	const getShuffledData = () => {
		const shuffledData = splitAndShuffleCollectionForMatchingGame(
			data
		);

		setShuffledSourceTexts(shuffledData.shuffledSourceTexts);
		setShuffledTranslations(shuffledData.shuffledTranslations);
	};

	useEffect(() => {
		if (!data) return;

		getShuffledData();
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

	// useEffect(()=>{
	// 	if(numberOfLives === 0) {
	// 		resetCurrentLevel()

	// 	}
	// },[numberOfLives])

	if (!data) return <Loader />;

	if (data.length < 5) return (
		<Typography
		variant='h5'
				color='blue-gray'
				className='mb-2 text-center'>
			The collection does not have enough vocabulary. Please add more
			or select another collection!
		</Typography>);

	return (
		<>
			<div className='w-full relative '>
				<Card className='w-full mb-4'>
					<CardBody className=' h-full'>
						<Typography
							variant='h5'
							color='blue-gray'
							className='mb-2 text-center'
						>
							Match the source text with its translation
						</Typography>
						<Typography
							variant='h5'
							color='blue-gray'
							key={numberOfLives}
							className='mb-2 text-center text-red-600 font-semibold text-lg animate-wiggle duration-200 repeat-[2] flex items-center justify-center gap-2'
						>
							{numberOfLives}{' '}
							<Heart color='#e53935' fill='#e53935' />
						</Typography>
					</CardBody>
				</Card>
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
				onClick={nextQuestionSet}
			/>
			<WrongAnswerFooter
				shown={numberOfLives === 0}
				onClick={resetCurrentLevel}
			/>
		</>
	);
};

export default Page;
