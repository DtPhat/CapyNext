'use client';

import { motion } from 'framer-motion';

import styles from '@/lib/styles';
import { fadeIn, staggerContainer, zoomIn } from '@/lib/motion';

const Features = () => (
  <section className='space-y-16' id='explore'>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-4 flex lg:flex-row flex-col gap-6`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-1 flex flex-col rounded-lg relative gap-2"
      >
        <h1 className='text-3xl font-semibold text-white'>Learn with most interesting materials</h1>
        <div className='bg-primary text-tertiary rounded-lg p-4 text-xl leading-10 font-semibold'>
          Dive into a world of captivating videos and engaging stories designed to make learning a thrilling adventure. Our platform offers the best of both worlds, combining visual excitement with compelling narratives to keep you hooked and eager to learn more. Whether you're exploring new topics or deepening your understanding, our innovative content will keep you inspired and motivated every step of the way
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="relative flex-1 flex justify-center items-center"
      >
        <div className='flex flex-col gap-2'>
          <img
            src="showcase/feature_3.png"
            alt="feature"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
      </motion.div>

    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-4 flex lg:flex-row flex-col gap-6`}
    >
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="relative flex-1 flex justify-center items-center"
      >
        <div className='flex flex-col'>
          <img
            src="showcase/feature_4_1.png"
            alt="feature"
            className="w-full h-48 object-cover rounded-t-xl"
          />  
          <img
            src="showcase/feature_4_2.png"
            alt="feature"
            className="w-full h-48 object-cover rounded-b-xl"
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-1 flex flex-col rounded-lg relative gap-2"
      >
        <h1 className='text-3xl font-semibold'>Remember Vocabulary For Life</h1>
        <div className='bg-tertiary rounded-lg p-4 text-xl leading-10 font-semibold text-black/80'>
        Transform your learning experience with our interactive games which are played with your own collections, making mastering English knowledge and vocabulary fun and effortless. Our platform turns study time into playtime, using gamification techniques to enhance memory retention and understanding.</div>
      </motion.div>
    </motion.div>
  </section>
);

export default Features;