import React from 'react'

const NoData = ({ text = "No data found!" }: { text?: string }) => {
  return (
    <div className='flex flex-col p-2 items-center'>
      <div className='self-start'>
        <h1 className='px-2 text-3xl font-semibold text-green-variant dark:text-green-dark text-primary'>{text}</h1>
        {/* <span className='text-xl text-accent'></span> */}
      </div>
      <img src="/no-data.svg" className='w-[54rem]' alt="Not found" />
    </div>
  )
}

export default NoData