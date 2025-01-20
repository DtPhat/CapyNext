import { Abril_Fatface } from 'next/font/google';
import React from 'react'

const abrilFatface = Abril_Fatface({ weight: "400", subsets: ["latin"] });

export const AppLogo = () => {
  return (
    <div>
      <div className="flex items-center justify-between select-none">
        <img src="/icon.png" alt="brand" className="w-9 h-9" />
        <span className={`${abrilFatface.className} text-2xl text-brown-primary`}>Capy</span>
        <span className={`${abrilFatface.className} text-2xl text-primary`}>Venture</span>
      </div>
    </div>
  )
}

export const AppLogo2 = () => {
  return (
    <div>
      <div className="flex items-center justify-between select-none">
        <img src="/icon.png" alt="brand" className="w-12 h-12 mr-1" />
        <span className={`${abrilFatface.className} text-3xl text-orange-50`}>Capy</span>
        <span className={`${abrilFatface.className} text-3xl text-green-50`}>Venture</span>
      </div>
    </div>
  )
}