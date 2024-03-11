import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

interface ButtonIconProps extends React.ComponentProps<"button"> {
  Icon?: any,
  iconDirection?: "left" | "right",
  text?: string,
  className?: string,
  onClick?: () => void
  linkTo?: string
}

const ButtonIcon = ({ Icon, iconDirection, text, className, onClick }: ButtonIconProps) => {
  return (
    <Button variant='text' className={`p-2 border-black/50 border-2 rounded-lg flex items-center gap-1 text-primary border-primary text-base hover:bg-secondary/20
    !${className}
    ${iconDirection === 'left' ? 'pr-4' : ''} ${iconDirection === 'right' ? 'pl-4' : ''}
    `}
      onClick={onClick}>
      {iconDirection === "left" ? Icon : ""}
      <span className="normal-case">{text}</span>
      {(!iconDirection || iconDirection === "right") ? Icon : ""}
    </Button>
  )
}
export const NavigateButtonIcon = ({ text, className, linkTo }: ButtonIconProps) => {
  return (
    <Link href={linkTo || '/'} className='group'>
      <Button variant="text" className={`text-sm flex items-center gap-2 px-4 py-2 !${className}`}>
        <span className='transition duration-400 group-hover:-translate-x-1'>{text}</span>
        <div>
          <ArrowRightIcon className='w-5 h-5 transition duration-400 group-hover:translate-x-1' />
        </div>
      </Button>
    </Link>
  )
}

export default ButtonIcon