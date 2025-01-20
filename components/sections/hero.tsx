'use client';

import { motion } from 'framer-motion';
import styles from '@/lib/styles';
import { slideIn, staggerContainer, textVariant } from '@/lib/motion';
import { Abril_Fatface } from 'next/font/google';
import { Button } from '@material-tailwind/react';
import { GettingStartedDialog } from '../dialog';
const abrilFatface = Abril_Fatface({ weight: "400", subsets: ["latin"] });
import { useRouter } from 'next/navigation'
import { useContext } from 'react';
import { DisplayContext } from '@/providers/display';

const Hero = () => {
  const router = useRouter()
  const { setOpenSidebar } = useContext(DisplayContext)
  return (
    <section className={`pl-4 w-full `}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`mx-auto flex flex-col w-full relative`}
      >

        <div className="flex flex-col justify-center items-center absolute-center gap-4 pb-12 z-10 w-full text-center">
          <motion.h1 variants={textVariant(1.2)}>
            <div className="flex items-center justify-between select-none">
              <span className={`${abrilFatface.className} text-[3rem] text-brown-50`}>Effective & Enjoyable</span>
              {/* <img src="/icon.png" alt="brand" className="w-32 h-32" /> */}
            </div>
          </motion.h1>
          <motion.div
            variants={textVariant(1.1)}
            className="flex flex-row justify-center items-center"
          >
            <span className={`${abrilFatface.className} text-[3rem] text-foreground uppercase`}>English learning adventure</span>
          </motion.div>
          <motion.div
            variants={textVariant(1.1)}
            className="flex flex-row justify-center items-center gap-8"
          >
            <GettingStartedDialog OpenButton={
              <Button color='green' variant='text' className='text-2xl underline text-green-50'
              >
                How to learn
              </Button>
            } />
            <Button color='green' variant='gradient' className='text-2xl'
              onClick={() => { router.push('/home'); setOpenSidebar(true) }}>
              Start now
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="relative w-full h-full pt-8 mt-8"
        >
          <div className="absolute w-full h-[20rem] hero-gradient rounded-tl-[140px] z-[0] -top-[1rem]" />

          <img
            src="/landing.jpg"
            alt="hero_cover"
            className="w-full h-[34rem] object-cover rounded-tl-[140px] z-10 relative"
          />

          <a href="#explore" className='flex justify-end mr-4'>
            <div className="flex flex-col justify-end -mt-14 bottom-8 relative border z-10 hero-gradient rounded-full w-40 h-40 px-8 py-2">
              <img
                src="/icon.png"
                alt="stamp"
                className="w-32 h-32 object-contain"
              />
              <span className='text-center font-bold bottom-20 text-white uppercase text-sm'>Learn & play</span>
            </div>
          </a>

        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;