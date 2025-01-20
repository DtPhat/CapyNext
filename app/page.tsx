"use client"
import Footer from '@/components/sections/footer'
import Features from '@/components/sections/features'
import Hero from '@/components/sections/hero'
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