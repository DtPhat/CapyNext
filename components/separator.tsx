import React from 'react'

interface Props extends React.ComponentProps<'div'> {

}

const Separator = ({ }: Props) => {
  return (
    <hr className="my-4 border border-black/20" />
  )
}

export default Separator