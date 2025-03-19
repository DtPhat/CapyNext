import { shuffle } from 'lodash';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import SingleAnswerCard from './single-answer-card';

type Props = {
	questionData: {
		index: number;
		question: string[];
		answer: string;
		isSentence: boolean;
	};
	selectedCard: string;
	onClick: (text: string) => void;
	fillerAnswers: string[];
};

const WordGuessingAnswerCard = (props: Props) => {
	const { fillerAnswers,  onClick, selectedCard, questionData} = props;
	const { index, question, answer, isSentence } = questionData;

	const [answers, setAnswers] = useState<string[]>([]);

	const handleOnClick = (text: string) => {
		if (onClick) {
			onClick(text);
		}
	};

	useEffect(() => {
		const array: string[] = [];

		if (isSentence) {
			const randomNumber = Math.floor(Math.random() * (8 - 5 + 1)) + 5;

			array.push(answer);

			while (array.length < randomNumber) {
				const shuffled = shuffle(fillerAnswers);
				for (let i = 0; i < fillerAnswers.length - 1; i++) {
					if (shuffled[i] !== answer) array.push(shuffled[i]);
				}
			}

			setAnswers(shuffle(array));
		} else {
			array.push(answer);
			const shuffled = shuffle(fillerAnswers);
			const filler = shuffled[0];
			const filler2 = shuffled[1];
			const chars = filler.trim().split('');
			filler2
				.trim()
				.split('')
				.forEach((char) => {
					chars.push(char);
				});
			chars.forEach((char) => {
				if (array.findIndex((item) => item === char) === -1) {
					array.push(char);
				}
			});
			setAnswers(shuffle(array));
		}
	}, [questionData, fillerAnswers, isSentence, answer]);

	return (
		<div className='flex justify-center gap-4 w-full'>
			{answers.map((item, index) => (
				<SingleAnswerCard
					key={index + item}
					item={item}
					isSentence={isSentence}
					selectedCard={selectedCard}
					onClick={handleOnClick}
				/>
			))}
		</div>
	);
};

export default WordGuessingAnswerCard;
