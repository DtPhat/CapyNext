import { Card, CardBody, Typography } from '@material-tailwind/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Props = {
	item: {
		id: string;
		text: string;
	};
	selectedOne: { id: string; text: string } | null;
	selectedTwo: { id: string; text: string } | null;
	onClick: (item: { id: string; text: string }) => void;
	shouldWait: boolean;
	toggleLevelReset: boolean;
};

const MatchingGameCard = (props: Props) => {
	const { item, selectedOne, selectedTwo, onClick, shouldWait, toggleLevelReset } = props;

	const [disabled, setDisabled] = useState<boolean>(false);
	const [selected, setSelected] = useState<boolean>(false);
	const [matched, setMatched] = useState<boolean>(false);


	const handleOnClick = () => {
		if (onClick && !shouldWait && !disabled) {
			onClick(item);
		}
	};

	const handleResetState = () => {
		setSelected(false);
		setMatched(false);
		setDisabled(false);

	}

	useEffect(()=>{
		handleResetState();
	},[toggleLevelReset])

	useEffect(() => {
		if (
			selectedOne?.text === item.text ||
			selectedTwo?.text === item.text
		) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [selectedOne, selectedTwo]);

	useEffect(() => {
		if (selected) {
			if (selectedOne !== null && selectedTwo !== null && selectedOne.id === selectedTwo.id ) {
				setMatched(true);
			}
		}
	}, [selectedOne, selectedTwo, selected]);

	useEffect(() => {
		if (matched === true) {
			setDisabled(true);
		}
	}, [matched]);

	

	return (
		<Card
			className={clsx(
				'bg-foreground select-none transition-all duration-150 overflow-hidden w-60 py-2 border-2  cursor-pointer border-b-[6px]    ',
				selected && ' border-accent/60',
				selected && selectedOne && selectedTwo 
					? matched
						? 'animate-expand-contract duration-700 repeat-1 border-green-600/60   '
						: 'animate-wiggle duration-200 repeat-[2] border-red-600/60'
					: '',
				disabled
					? 'text-gray-400 cursor-default'
					: 'hover:text-accent hover:font-bold active:border-b-2 active:mt-1 '
			)}
			onClick={handleOnClick}
		>
			<div
				className={clsx(
					'h-full w-full absolute top-0 left-0 transition-all duration-300',
					selected && 'bg-accent/10',
					selected && selectedOne && selectedTwo
						? matched
							? 'bg-green-600/20'
							: 'bg-red-600/20'
						: '',
					disabled && 'bg-gray-500/5 '
				)}
			/>
			<CardBody className='flex justify-center items-center h-full'>
				<Typography className='font-semibold'>{item.text}</Typography>
			</CardBody>
		</Card>
	);
};

export default MatchingGameCard;
