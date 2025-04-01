'use client';

import { motion } from 'framer-motion';

import styles from '@/lib/styles';
import { footerVariants } from '@/lib/motion';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { AppLogo2 } from '../../../components/logo';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative mt-16 bg-gradient-to-r from-primary to-secondary`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold text-5xl text-white">
          Level up your English
        </h4>
        <Link href={'/home'}>
          <Button className="flex items-center h-fit py-2 px-4 bg-primary rounded-[32px] gap-[12px]">
            <img
              src="/icon.png"
              alt="headset"
              className="w-12 h-12 object-contain"
            />
            <span className="font-normal text-white text-lg">
              Depart now
            </span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <AppLogo2 />
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2024 - 2025 CapyVenture. All rights reserved.
          </p>

          <Link href={"https://www.facebook.com/CapyVenture"}>
            <div className="flex gap-4">
              <img
                src="/facebook.svg"
                alt={"Facebook"}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;