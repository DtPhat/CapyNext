import { Loader as LoadingIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <LoadingIcon className='w-5 h-5 animate-spin'/>
  )
}

export default Loader