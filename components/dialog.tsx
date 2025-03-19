'use client'
import {
  Button,
  Carousel,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ReactNode, useState } from "react";
import { toast, useToast } from "./ui/use-toast";
import { useRouter } from 'next/navigation'

import { Abril_Fatface } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Separator from "./separator";
import { subscribePremium } from "@/lib/actions/payment";
import { Toast } from "./ui/toast";
const abrilFatface = Abril_Fatface({ weight: "400", subsets: ["latin"] });

interface DialogProps {
  OpenButton?: ReactNode
  onConfirm?: () => Promise<any>;
  loading?: boolean;
  data?: any;
  message?: string;
  description?: string;
  toastMessage?: string;
  toastDescription?: string;
  open?: boolean;
  handleOpen?: () => void
}

export function ConfirmDialog({
  onConfirm,
  loading,
  OpenButton,
  data,
  message = 'Are you sure?',
  description = "Your action cannot be undone",
  toastMessage = 'Success',
  toastDescription = 'Your action was completed',
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(prev => !prev);

  const confirmAction = () => {
    if (onConfirm) {
      onConfirm()
        .then(response => {
          if (response) {
            toast({
              title: toastMessage,
              description: toastDescription,
            });
          }
        })
        .finally(toggleDialog);
    }
  };

  return (
    <>
      <button onClick={toggleDialog}>
        {OpenButton}
      </button>
      <Dialog open={isOpen} handler={toggleDialog}>
        <DialogHeader>{message}</DialogHeader>
        <DialogBody>{description}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="filled"
            color="green"
            onClick={confirmAction}
            disabled={loading}
            loading={loading}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}


export function LoginDialog({
  onConfirm,
  // loading,
  OpenButton,
  toastMessage = 'Login successfully ✔️',
  toastDescription = '',
  open: openProp,
  handleOpen: handleOpenProp,
}: DialogProps) {
  const [open, setOpen] = useState(openProp ?? false);
  const handleOpen = handleOpenProp ?? (() => setOpen((prevOpen) => !prevOpen));
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleConfirm = () => {
    if (onConfirm) {
      setLoading(true); // Set loading to true when handleConfirm is called
      onConfirm()
        .then(() => {
          toast({
            title: toastMessage,
            description: toastDescription,
          });
          handleOpen();
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false)); // Set loading to false when the promise is resolved or rejected
    }
  };

  return (
    <>
      <div onClick={handleOpen}>{OpenButton}</div>
      <Dialog
        size="xs"
        open={openProp ?? open}
        handler={handleOpen}
        className="p-4"
      >
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Log in to{' '}
              <span className={`${abrilFatface.className} text-2xl text-brown-primary`}>
                Capy
              </span>
              <span className={`${abrilFatface.className} text-2xl text-primary`}>
                Venture
              </span>
            </Typography>
            <Typography color="gray" variant="paragraph" className="mt-2">
              Choose your authentication method
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="!px-5">
          <div className="mb-6">
            <ul className="mt-3 -ml-2 flex flex-col gap-1">
              <MenuItem
                className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md bg-white"
                onClick={handleConfirm}
                disabled={loading}
              >
                <img
                  src="/auth/google-logo.jpg"
                  alt="google-icon"
                  className="h-6 w-6"
                />
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Log in with Google
                </Typography>
              </MenuItem>
              <MenuItem
                className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md bg-white"
                disabled={loading}
              >
                <img
                  src="https://i.pinimg.com/736x/42/75/49/427549f6f22470ff93ca714479d180c2.jpg"
                  alt="facebook logo"
                  className="h-6 w-6 rounded-md"
                />
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                  Log in with Facebook
                </Typography>
              </MenuItem>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          <Typography variant="small" color="gray" className="font-normal">
            New to our website?
          </Typography>
          <GettingStartedDialog
            OpenButton={
              <Button variant="text" size="sm">
                Learn More
              </Button>
            }
            onConfirm={() => Promise.reject(new Error("Function not implemented."))}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const PremiumDialog = ({
  onConfirm,
  loading,
  OpenButton,
  open = false,
  handleOpen = () => { console.log('Do something') }
}: DialogProps) => {
  const { toast } = useToast()

  return (
    <Dialog open={open} handler={handleOpen} >
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
            <Button color='green'
              // onClick={async () => { await subscribePremium('MONTHLY') }}
              onClick={() => toast({
                variant: "destructive",
                title: "Payment is currently locked!",
                description: "Please try later!",
              })}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="blue-gray" onClick={handleOpen}>
          close
        </Button>
        <Button variant='text' onClick={handleOpen}>
          Ok, Got it
        </Button>
      </DialogFooter>
    </Dialog >
  )
}

export function GettingStartedDialog({ OpenButton }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prevState) => !prevState);

  const router = useRouter();

  return (
    <>
      <button onClick={handleOpen}>{OpenButton}</button>
      <Dialog open={isOpen} handler={handleOpen} size="md">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            How to learn on{" "}
            <span className="text-3xl text-brown-primary">CapyVenture</span>
          </Typography>
        </DialogHeader>
        <div className="p-4">
          <Carousel
            className="rounded-md h-[33rem]"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
                {Array.from({ length }, (_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-brown-primary" : "w-4 bg-brown-primary/50"
                      }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-1/2 left-4 -translate-y-1/2"
              >
                <ArrowLeft className="size-10 text-brown-primary" />
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-1/2 right-4 -translate-y-1/2"
              >
                <ArrowRight className="size-10 text-brown-primary" />
              </IconButton>
            )}
          >
            <div>
              <img
                src="instruction/instruction_1.png"
                alt="image 1"
                className="h-96 w-full object-cover"
              />
              <div className="pt-3 font-semibold text-lg">
                Select any words or sentences you don't know, and we'll translate them instantly.
                Then, you can add these words or sentences to your collection to review later.
              </div>
            </div>
            <div>
              <img
                src="instruction/instruction_2.png"
                alt="image 2"
                className="h-96 w-full object-cover"
              />
              <div className="pt-1 font-semibold text-lg">
                You can manage your own collections and add as many vocabularies as you want.
                Make sure to practice them further in{" "}
                <p
                  className="cursor-pointer underline hover:text-accent"
                  onClick={() => router.push("/game")}
                >
                  Game Center
                </p>
              </div>
            </div>
            <div>
              <img
                src="instruction/instruction_3.png"
                alt="image 3"
                className="h-96 w-full object-cover"
              />
              <div className="pt-3 font-semibold text-lg">
                From our story or video list, you can filter your preferred topics and your current English level.
                Subscribe to premium to unlock exclusive content and enhance your learning experience.
              </div>
            </div>
          </Carousel>
        </div>
      </Dialog>
    </>
  );
}
