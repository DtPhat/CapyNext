import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Button, IconButton } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'
import type { variant } from '@material-tailwind/react/types/components/button'
import _ from 'lodash'
import { FilterX } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface ButtonIconProps extends React.ComponentProps<"button"> {
  Icon?: React.ReactNode,
  iconDirection?: "left" | "right",
  text?: string,
  className?: string,
  onClick?: () => void
  linkTo?: string,
  variant?: variant
}

const ButtonIcon = ({ Icon, iconDirection, text, className, onClick, variant = 'text' }: ButtonIconProps) => {
  return (
    <Button
      variant={variant}
      color='green'
      className={`p-2 rounded-lg flex items-center gap-1 text-lg border-primary ${className}
        ${iconDirection === 'left' ? 'pr-4' : ''} ${iconDirection === 'right' ? 'pl-4' : ''}
      `}
      onClick={onClick}>
      {iconDirection === "left" ? Icon : ""}
      <span className="normal-case">{text}</span>
      {(!iconDirection || iconDirection === "right") ? Icon : ""}
    </Button>
  )
}
export const NavigateButtonIcon = ({ text, className, linkTo = '/', disabled = false }: ButtonIconProps) => {
  return (
    <Link href={linkTo} className={`group ${disabled ? 'pointer-events-none' : ''}`}>
      <Button variant="text" className={`text-sm flex items-center gap-2 px-4 py-2 !${className}`} disabled={disabled}>
        <span className='transition duration-400 group-hover:-translate-x-1'>{text}</span>
        <div>
          <ArrowRightIcon className='w-5 h-5 transition duration-400 group-hover:translate-x-1' />
        </div>
      </Button>
    </Link>
  )
}

export default ButtonIcon