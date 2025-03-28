import { Typography } from '@material-tailwind/react';
import React from 'react';

type Props = {
	shown: boolean,
	onClick: () => void,
	subText?: string
	title?: string
};

const WrongAnswerFooter = (props: Props) => {
	const { onClick, shown, subText, title = "Wrong!" } = props;

	const handleOnClick = () => {
		if (onClick) {
			onClick();
		}
	};

	if (!shown) return null;

	return (
		<div className='fixed bottom-0 left-0 h-48 flex items-center justify-between w-full bg-red-100 z-10 py-10 px-[25vw] border-t'>
			<div className='flex flex-col '>
				<Typography variant='h4' className='text-red-700'>
					{title}
				</Typography>
				<Typography variant='h6' className='text-gray-500'>
					{subText && <>Correct answer: {subText}</>}
				</Typography>
			</div>
			<button
				onClick={handleOnClick}
				className='bg-red-600 font-semibold text-lg px-10 py-4 rounded-md shadow-md hover:bg-red-400 transition-colors duration-300 uppercase'
			>
				Try again
			</button>
		</div>
	);
};

export default WrongAnswerFooter;
