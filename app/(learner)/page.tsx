"use client"
import Footer from '@/app/(learner)/_components/footer'
import Features from '@/app/(learner)/_components/features'
import Hero from '@/app/(learner)/_components/hero'
import { useAuth } from '@/providers/auth'
// import About from '@/components/sections/about'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const RootPage = () => {
  const router = useRouter()
  const { userInfo } = useAuth()
  useEffect(() => {
    if (userInfo) {
      router.push('/home')
    }
  }, []);
  return (
    <div className='w-full bg-gradient-to-r from-primary via-secondary to-tertiary overflow-hidden '>
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default RootPage