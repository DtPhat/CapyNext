import { SWRConfig } from 'swr'
import React, { ReactNode } from 'react'
import { fetcher } from '@/lib/config/fetchter'
const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider