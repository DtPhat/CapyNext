"use client"
import { Collection } from '@/lib/definitions'
import React from 'react'
import useSWR from 'swr'

type CollectionMenuProps = {
  handleSelect: ({ ...arg }) => void
}
const CollectionMenu = ({ handleSelect }: CollectionMenuProps) => {
  const { data, isLoading } = useSWR('/collections')
  return (
    <div>CollectionMenu</div>
  )
}

export default CollectionMenu