'use client';
import ButtonIcon from '@/components/button-icon';
import Loader from '@/components/loader';
import { CollectionItem } from '@/lib/definitions';
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import { IconButton, Progress, Tooltip } from '@material-tailwind/react';
import { useCallback, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { ShuffleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NoData from '@/components/no-data';
import { shuffle } from 'lodash';
import { toast } from '@/components/ui/use-toast';


const CardSet = ({ initialData = [] }: { initialData: CollectionItem[] }) => {
	const [flip, setFlip] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
	const [data, setData] = useState(initialData);

	const styles = {
		card: `text-black bg-gradient-to-b from-accent/10 via-white to-accent/10 p-16
		w-[52rem] h-96 rounded-xl cursor-pointer flex justify-center items-center font-semibold shadow-lg text-xl transition-transform duration-100
		`,
	};

	const handleNext = useCallback(() => {
		if (activeStep < data?.length - 1) {
			setDirection(1);
			setFlip(false); // reset flip
			setActiveStep((cur) => cur + 1);
		}
	}, [data, activeStep]);

	const handlePrev = () => {
		if (activeStep > 0) {
			setDirection(-1);
			setFlip(false); // reset flip
			setActiveStep((cur) => cur - 1);
		}
	};

	const variants = {
		enter: (dir: number) => ({
			x: dir > 0 ? 1000 : -1000,
			opacity: 0,
			position: 'absolute' as const,
		}),
		center: {
			x: 0,
			opacity: 1,
			position: 'relative' as const,
		},
		exit: (dir: number) => ({
			x: dir < 0 ? 1000 : -1000,
			opacity: 0,
			position: 'absolute' as const,
		}),
	};

	const shuffleData = () => {
		const shuffledCollection = shuffle(data);
		setData(shuffledCollection)
		toast({
			title: "Shuffled!",
			description: "The collection has been reaarranged.",
		});
	}

	return (
		<div className='w-full flex flex-col items-center text-black'>
			<div>
				<div className="relative w-full h-full overflow-hidden p-4">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={activeStep}
							variants={variants}
							custom={direction} // direction must be a number
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: 'spring', stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
						>
							<div onClick={() => setFlip(!flip)}>
								<ReactCardFlip
									isFlipped={flip}
									flipDirection='vertical'
								>
									<div className={styles.card}>
										{data.at(activeStep)?.sourceText}
									</div>
									<div className={styles.card}>
										{data.at(activeStep)?.translation}
									</div>
								</ReactCardFlip>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				<Progress
					value={((activeStep + 1) / data.length) * 100}
					className='mt-4'
					size='sm'
				/>
			</div>
			<div className='w-[52rem]'>
				<div className='w-full py-4 flex gap-4 items-center justify-between'>
					<div>
						<Tooltip content='Shuffle'>
							<IconButton
								className='text-primary'
								variant='text'
								onClick={shuffleData}
							>
								<ShuffleIcon className='h-6 w-6' />
							</IconButton>
						</Tooltip>
					</div>
					<div className='flex gap-6 items-center !text-black'>
						<ButtonIcon
							className='text-primary'
							Icon={
								<ChevronLeftIcon className='w-6 h-6' />
							}
							iconDirection='left'
							text='PREV'
							onClick={handlePrev}
						/>
						<div className='font-semibold text-2xl text-black'>
							{activeStep + 1} / {data.length}
						</div>
						<ButtonIcon
							className='text-primary'
							Icon={
								<ChevronRightIcon className='w-6 h-6' />
							}
							iconDirection='right'
							text='NEXT'
							onClick={handleNext}
						/>
					</div>
					<div>
						<IconButton
							className='text-primary'
							variant='text'
						>
							<Cog6ToothIcon className='h-6 w-6' />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardSet;
