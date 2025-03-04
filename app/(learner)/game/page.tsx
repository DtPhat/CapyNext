'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const Page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/game/flashcard')
  }, []);
  return <div></div>
}

export default Page