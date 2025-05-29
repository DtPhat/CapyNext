'use client'
import type React from "react"
import { DashboardSidebar } from "./_components/dashboard-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/providers/auth"
import { useRouter } from "next/navigation"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userInfo } = useAuth()
  const router = useRouter();

  // if (!userInfo || userInfo.role !== 'admin') {
  //   router.push('/')
  //   return;
  // }
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b px-6 top-0 bg-background">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 p-6 bg-foreground">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

