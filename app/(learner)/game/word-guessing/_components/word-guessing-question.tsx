import clsx from 'clsx';
import React, { forwardRef } from 'react';

type PropsType = {
	questionSet: {
		index: number;
		question: string[];
		answer: string;
		isSentence: boolean;
	};
};

const WordGuessingQuestion = (props: PropsType) => {
	const { index, question, answer, isSentence } = props.questionSet;

	return (
		<div
			className={clsx(
				'w-full flex items-center justify-center flex-wrap',
				isSentence ? 'gap-4' : 'gap-[2px]'
			)}
		>
			{question.map((word, i) =>
				i === index ? (
					<div
						key={i + word}
						id='answer-slot'
						className='font-semibold text-2xl'
					>
						{word}
					</div>
				) : (
					<div key={i + word} className='font-semibold text-2xl'>
						{word}
					</div>
				)
			)}
		</div>
	);
};

export default WordGuessingQuestion;
