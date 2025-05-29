import React from 'react'

const NoData = ({ text = "No data found!" }: { text?: string }) => {
  return (
    <div className='flex flex-col p-2 items-center'>
      <div className='self-start'>
        <h1 className='px-2 text-2xl text-gray-500 mb-6'>{text}</h1>
        {/* <span className='text-xl text-accent'></span> */}
      </div>
      <img src="/no-data.svg" className='w-[54rem]' alt="Not found" />
    </div>
  )
}

export default NoData