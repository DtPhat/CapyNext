import React from 'react'
import { Skeleton as SkeletonUI } from '../ui/skeleton'
export const CardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <SkeletonUI className="h-60 w-full rounded-xl bg-primary/20" />
      <div className="space-y-2">
        <SkeletonUI className="h-4 w-full bg-primary/20" />
        <SkeletonUI className="h-4 w-5/6 bg-primary/20" />
      </div>
    </div>
  )
}

export const BarSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <SkeletonUI className="h-52 w-full rounded-xl bg-primary/20" />
    </div>
  )
}

export const RectangleSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <SkeletonUI className="h-96 w-full rounded-xl bg-primary/20" />
    </div>
  )
}
export const VocabCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <SkeletonUI className="h-20 w-full rounded-xl bg-primary/20" />
    </div>
  )
}

export const PageSkeleton = () => {
  return (
    <div className="w-full flex flex-col p-2 gap-4">
      <SkeletonUI className="h-72 w-full rounded-xl bg-primary/20" />
      <div className='mx-4'>
        <SkeletonUI className="h-16 w-full rounded-xl bg-primary/20" />
      </div>
      <div className='grid grid-cols-3 gap-8 mx-4'>
        {
          Array.from({ length: 3 }, (_, index) => (
            <SkeletonUI key={index} className="h-72 bg-primary/20" />
          ))
        }
      </div>
    </div>
  )
}

export const ContentSkeleton = () => {
  return (
    <div className="w-full flex flex-col p-8 gap-2">
      <SkeletonUI className="h-12 w-4/5 rounded-xl bg-primary/20" />
      <SkeletonUI className="h-[32rem] w-full rounded-xl bg-primary/20" />
      <div className='grid grid-cols-4 gap-4 mt-8'>
        {
          Array.from({ length: 4 }, (_, index) => (
            <SkeletonUI key={index} className="h-72 bg-primary/20" />
          ))
        }
      </div>
    </div>
  )
}