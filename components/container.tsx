import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  clasName?: string
}

const Container = ({ children, clasName = "" }: Readonly<ContainerProps>) => {
  return (
    <section className='w-full flex justify-center'>
      <div className={`px-16 py-8 flex flex-col gap-4 max-w-7xl w-full ${clasName}`}>
        {children}
      </div>
    </section>
  )
}

export default Container