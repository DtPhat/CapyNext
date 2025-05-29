import Link from "next/link"
import { BarChart3, ChevronDown, Home, Image, LayoutDashboard, MessageSquare, Settings, Users, Video } from "lucide-react"
import { ReactNode } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type SidebarItem = {
  label: string
  icon: ReactNode
  href?: string
  isCollapsible?: boolean
  subItems?: Array<{
    href: string
    label: string
  }>
}

type SidebarSection = {
  label: string
  items: SidebarItem[]
}

export function DashboardSidebar() {
  const sidebarItems: SidebarSection[] = [
    {
      label: "Main",
      items: [
        {
          href: "/dashboard",
          icon: <Home className="size-4" />,
          label: "Overview"
        },
        // {
        //   href: "/dashboard/analytics", 
        //   icon: <BarChart3 className="size-4" />,
        //   label: "Analytics"
        // }
      ]
    },
    {
      label: "Content",
      items: [
        {
          label: "Videos",
          icon: <Video className="size-4" />,
          isCollapsible: true,
          subItems: [
            { href: "/dashboard/videos", label: "All Videos" },
            // { href: "/dashboard/videos/published", label: "Published" },
            { href: "/dashboard/videos/upload", label: "Upload New" }
          ]
        },
        {
          label: "Stories",
          icon: <Image className="size-4" />,
          isCollapsible: true,
          subItems: [
            { href: "/dashboard/stories", label: "All Stories" },
            // { href: "/dashboard/stories/published", label: "Published" },
            { href: "/dashboard/stories/create", label: "Create New" }
          ]
        },
        {
          label: "Categories",
          icon: <Image className="size-4" />,
          isCollapsible: true,
          subItems: [
            { href: "/dashboard/categories", label: "All Categories" },
            // { href: "/dashboard/stories/published", label: "Published" },
            { href: "/dashboard/categories/create", label: "Create New" }
          ]
        },
        // {
        //   href: "/dashboard/comments",
        //   icon: <MessageSquare className="size-4" />,
        //   label: "Comments"
        // }
      ]
    },
    {
      label: "Management",
      items: [
        {
          href: "/dashboard/users",
          icon: <Users className="size-4" />,
          label: "Users"
        },
        {
          href: "/dashboard/settings",
          icon: <Settings className="size-4" />,
          label: "Settings"
        }
      ]
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dashboard</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sidebarItems.map((section, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  item.isCollapsible ? (
                    <Collapsible key={itemIndex} defaultOpen={true}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {item.icon}
                            <span>{item.label}</span>
                            <ChevronDown className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems?.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.href}>{subItem.label}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton asChild>
                        {item.href && (
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <div className="rounded-lg bg-muted p-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary/10">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}