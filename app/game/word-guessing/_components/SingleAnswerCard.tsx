import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

gsap.registerPlugin(MotionPathPlugin);

type Props = {
	item: string;
	onClick: (text: string) => void;
	isSentence: boolean;
    selectedCard: string
};

const SingleAnswerCard = (props: Props) => {
	const { item, onClick, isSentence,  selectedCard } = props;

	const elementRef = useRef<HTMLDivElement>(null);
	const tl = useRef<any>();

    const slot = document.querySelector('#answer-slot')
	const { contextSafe } = useGSAP(() => {

		if (slot == null ||  elementRef.current == null) {
			return;
		}


		const p = MotionPathPlugin.getRelativePosition(
			elementRef.current,
			slot,
			{ x: 0, y: 0 }
		);

		tl.current = gsap.timeline().from(elementRef.current, {
			x: p.x,
			y: p.y - 2,
            duration: 0.3
		});
	},{dependencies: [elementRef, slot, item]});

    useGSAP(()=>{
		if(!tl || !tl.current) return;
		
        if(selectedCard !== item) {
		    tl.current.reversed(false);
            console.log(item, " is reversing")
        } else {
            console.log(item, " is playing")
		    tl.current.reversed(true);
        }
    },{dependencies: [selectedCard, tl, item]})

	const handleOnClick = () => {
		if (onClick) {
			onClick(item);
		}
	};


	return (
		<div
			ref={elementRef}
			onClick={handleOnClick}
			className={clsx(
				'font-semibold text-2xl border shadow-md bg-white rounded-md cursor-pointer select-none flex items-center justify-center',
				isSentence ? 'px-2 py-1' : ' min-w-3 max-w-5 '
			)}
		>
			{item}
		</div>
	);
};

export default SingleAnswerCard;
