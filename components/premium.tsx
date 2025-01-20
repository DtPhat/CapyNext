'use client'
import { CrownIcon } from 'lucide-react'
import React, { MouseEventHandler, ReactNode } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { usePathname, useRouter } from 'next/navigation';
import Separator from './separator';
import { subscribePremium } from '@/lib/actions/payment';
import { useAuth } from '@/providers/auth';
import { useToast } from './ui/use-toast';
interface PremiumProps {
  children: ReactNode,
  isPremium?: boolean,
  _id: string,
  contentType: 'videos' | 'stories'
}
const Premium = ({ children, isPremium, _id, contentType }: PremiumProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  // const pathname = usePathname()
  const { userInfo } = useAuth()
  const { toast } = useToast()
  const handlePremium: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (event) => {
    setOpen(!open)
    if (typeof event === 'boolean') {
      return;
    }
    event?.stopPropagation()
    event?.preventDefault();
  };

  const handleFreemium = () => {
    router.push(`/${contentType}/${_id}`)
  }
  return (
    <>
      <div
        className='group relative cursor-pointer'
        onClick={isPremium && !userInfo?.isPremium ? handlePremium : handleFreemium}
      >
        {children}
        {isPremium
          && < div className="z-10 absolute right-6 top-3 rounded-md size-8 bg-yellow-600 opacity-50 group-hover:opacity-100">
            <CrownIcon className="size-6 absolute-center text-white" />
          </div>
        }
      </div >
      <Dialog open={open} handler={handlePremium}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Premium Subscription
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-yellow-700"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography variant="h4" className='text-yellow-900'>
            You need to subscribe to continue!
          </Typography>
          {/* <Typography className="text-center font-normal">
            We currently have 3 premium plan, choose the best plan for your needs.
          </Typography> */}
          <div className=''>
            <div className='border-2 w-64 flex flex-col p-4 rounded-md bg-foreground gap-2'>
              <h1 className='text-center font-bold text-black text-sm uppercase'>Monthly subscription</h1>
              <div className='text-center text-xs'>
                Recurring charge monthly
              </div>
              <div className='mx-2'>
                <Separator className='!my-0' />
              </div>
              <p className='text-center text-xl font-bold text-black'>
                50,000VNĐ
              </p>
              <div className='mx-2'>
                <Separator className='!my-0' />
              </div>
              <div className='text-center h-20 text-sm'>
                Full access to all videos and stories while your subscription is active.
              </div>
              <Button color='green' disabled={!userInfo} onClick={async () => {
                // await subscribePremium('MONTHLY')
                setOpen(!open)
                toast({
                  variant: "destructive",
                  title: "Payment is currently locked!",
                  description: "Please try later!",
                })
              }}>Subscribe</Button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handlePremium}>
            close
          </Button>
          <Button variant='text' onClick={handlePremium}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog >
    </>
  )
}

export default Premium