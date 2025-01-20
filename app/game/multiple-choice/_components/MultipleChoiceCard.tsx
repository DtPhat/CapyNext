import { Card, CardBody, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

type Props = {
	item: {
		id: string;
		sourceText: string;
		translation: string;
	};
	selectedCard: string;
	correctAnswer?: string;
	disabled: boolean;
	onClick: (item: string) => void;
};

function MultipleChoiceCard(props: Props) {
	const { item, selectedCard, correctAnswer, onClick, disabled } = props;

	const [selected, setSelected] = useState<boolean>(false);
	const [correct, setCorrect] = useState<boolean>(false);

	const handleOnClick = () => {
		if (onClick) {
			onClick(item.id);
		}
	};

	useEffect(()=>{
		if(selectedCard){
			setSelected(selectedCard === item.id)
			setCorrect(item.id === correctAnswer)
		} else {
			setSelected(false)
		}
	},[selectedCard])

	return (
		<Card
			className={clsx(
				'bg-foreground select-none transition-all duration-150 overflow-hidden w-80 py-2 border-2  cursor-pointer border-b-[6px]    ',
				selected && ' border-accent/60',
				selectedCard && selected
					? correct
						? 'animate-expand-contract duration-700 repeat-1 border-green-600/60   '
						: 'animate-wiggle duration-200 repeat-[2] border-red-600/60'
					: '',
					disabled ?  'text-gray-400 cursor-default'
					: 'hover:text-accent hover:font-semibold active:border-b-2 active:mt-1 '
			)}
			onClick={handleOnClick}
		>
			<div
				className={clsx(
					'h-full w-full absolute top-0 left-0 transition-all duration-300',
					selected && 'bg-accent/10',
					selected
						? correct
							? 'bg-green-600/20'
							: 'bg-red-600/20'
						: '',
						disabled && 'bg-gray-500/5 '
				)}
			/>
			<CardBody className='flex justify-center items-center h-full'>
				<Typography className='font-semibold'>
					{item.translation}
				</Typography>
			</CardBody>
		</Card>
	);
}

export default MultipleChoiceCard;
