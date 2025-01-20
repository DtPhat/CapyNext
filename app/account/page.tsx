"use client"

import Container from "@/components/container"
import { useAuth } from "@/providers/auth"
import { Crown } from "lucide-react"
const Account = () => {
  const anonymous = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_rW9tvc5tzHfImg0xXTReFOQIAuAbt-EXuFdvzgB9g&s";
  const { userInfo } = useAuth()
  return (
    // <div className='bg-red-500 text-white w-full m-4 rounded p-2'>Feature is under development!</div>
    <Container>
      <h1 className="font-bold text-2xl">Account Infomation</h1>
      <div className="flex gap-20 items-start">
        <div className="space-y-2 h-28">
          <div className="text-3xl">{userInfo?.name}</div>
          <div className="">{userInfo?.email}</div>
          {
            userInfo?.isPremium && <div className="flex rounded font-bold gap-2 bg-yellow-800 w-fit px-2 py-1">
              <Crown className="size-6 text-white" />
              <p className="text-white">Premium</p>
            </div>
          }
        </div>
        <div>
          <img
            src={userInfo?.picture || anonymous}
            alt="Display image"
            className="size-24 w-full object-cover rounded-full"
          />
        </div>
      </div>

    </Container>
  )
}

export default Account