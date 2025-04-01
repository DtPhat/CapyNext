'use client';
import Separator from '@/components/sections/separator';
import { Collection } from '@/lib/definitions';
import {
	ChevronDownIcon
} from '@heroicons/react/24/solid';
import {
	Button,
	Chip,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import OtherGames from './_components/other-games';
import { GameContext } from './_lib/context';
const GameLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const { data, isLoading } = useSWR('/collections');
	const [chosenCollection, setChosenCollection] = useState<Collection | null>(null);
	const collections: Collection[] = data;
	useEffect(() => {
		if (collections?.length) {
			setChosenCollection(collections[0]);
		}
	}, [data]);
	return (
		<div className='px-16 py-8 flex flex-col gap-4 w-full h-full'>
			<div className='flex w-full justify-center'>
				<Menu offset={10}>
					<div className='flex items-center text-xl font-semibold gap-4'>
						<div className='text-black asdasd'>Playing with:</div>
						<MenuHandler>
							<Button
								variant='outlined'
								className='px-2 py-1 border-black/50 border-2 rounded-lg flex items-center gap-1 text-primary border-primary'
							>
								<span className='normal-case text-lg'>
									{chosenCollection?.name || 'Choose collection'}
								</span>
								<ChevronDownIcon className='w-6 h-6' />
							</Button>
						</MenuHandler>
					</div>
					<MenuList className='p-1 text-black bg-foreground flex flex-col gap-1'>
						{collections?.map((collection) => (
							<MenuItem
								key={collection._id}
								className='flex gap-4 border-2 items-center justify-between py-0.5'
								onClick={() => {
									setChosenCollection(collection);
								}}
							>
								<div className='rounded-full border-2'>
									<img
										className='w-8 h-8'
										src={collection.picture}
									/>
								</div>
								<div className='text-ellipsis min-w-32 max-w-64'>
									<p className='truncate'>
										{collection?.name}
									</p>
								</div>
								<Chip
									value={collection.totalVocab}
									size='sm'
									variant='ghost'
									className='rounded-full'
								/>
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</div>
			<Separator />
			<div className='w-full'>
				<GameContext.Provider
					value={{ chosenCollection, setChosenCollection }}
				>
					{children}
				</GameContext.Provider>
			</div>
			<Separator />
			<OtherGames />	
		</div>
	);
};

export default GameLayout;
