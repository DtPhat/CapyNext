'use client'
import { Button, IconButton } from '@material-tailwind/react';
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Stepper, Step, Progress } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import ButtonIcon from '../common/button-icon';
import { CollectionItem } from '@/app/lib/definitions';


const Flashcard = ({ data }: { data: CollectionItem[] }) => {

  const [flip, setFlip] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const styles = {
    card: `bg-accent/20 text-black w-[52rem] h-96 rounded-xl cursor-pointer flex justify-center items-center font-semibold shadow-md text-xl transition-transform duration-100`
  }

  let isLastStep = activeStep == data.length - 1
  let isFirstStep = activeStep == 0
  const handleNext = () => {
    !(isLastStep) && setActiveStep((cur) => cur + 1)
  };
  const handlePrev = () => {
    !(isFirstStep) && setActiveStep((cur) => cur - 1)
  };

  return (
    <>
      {!data.length ? <div>No data</div>
        : < div className='w-full flex flex-col items-center'>
          <div>
            <div onClick={() => setFlip(!flip)} >
              <ReactCardFlip isFlipped={flip}
                flipDirection="vertical">
                <div className={styles.card}>
                  {data.at(activeStep)?.sourceText}
                </div>
                <div className={styles.card}>
                  {data.at(activeStep)?.translation}
                </div>
              </ReactCardFlip>
            </div>
            <Progress value={((activeStep + 1) / data.length) * 100} className='mt-4' size='sm' />
          </div>
          <div className='w-[52rem]'>

            <div className="w-full py-4 flex gap-4 items-center justify-between">
              <div>
                <IconButton className='text-primary' variant='text'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shuffle"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" /><path d="m18 2 4 4-4 4" /><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" /><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" /><path d="m18 14 4 4-4 4" /></svg>
                </IconButton>
              </div>
              <div className="flex gap-6 items-center">
                <ButtonIcon Icon={<ChevronLeftIcon className='w-6 h-6' />} iconDirection='left' text='PREV' onClick={handlePrev} />
                <div className='font-semibold text-2xl'>{activeStep + 1} / {data.length}</div>
                <ButtonIcon Icon={<ChevronRightIcon className='w-6 h-6' />} iconDirection='right' text='NEXT' onClick={handleNext} />
              </div>
              <div>
                <IconButton className='text-primary' variant='text'>
                  <Cog6ToothIcon className='h-6 w-6' />
                </IconButton>
              </div>
            </div>
          </div>
        </div >
      }</>
  );
};
export default Flashcard;