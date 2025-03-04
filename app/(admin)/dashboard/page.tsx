'use client'
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/navigation-tabs";
import { chartData } from "@/lib/placeholders";
import Link from "next/link";
import { Overview } from "../_components/overview";
import { RecentSales } from "../_components/recent-sales";

const tabData = {
  totalRevenue: chartData.reduce((total, item) => total + item.total, 0),
  subscriptions: 35,
  visitors: 992,
}
export default function DashboardPage() {
  return (
    <>
      <Container clasName="">
        <div className="md:hidden">
        </div>
        <div className="hidden flex-col md:flex mb-4 w-full">
          <div className="flex-1 space-y-4 pt-4">
            <div className="flex items-center justify-between space-y-2 px-2">
              <h2 className="text-3xl font-bold tracking-tight px-2">Dashboard</h2>
              <div className="flex items-center font-semibold pr-2">
                <div>{(new Date()).toUTCString()}</div>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              {/* <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList> */}
              <TabsContent value="overview" className="space-y-4 ">
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                  <Card className="bg-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{tabData.totalRevenue} VND</div>
                      <p className="text-xs text-muted-foreground">
                        {/* +42.8% from last month */}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Subscriptions
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{tabData.subscriptions}</div>
                      <p className="text-xs text-muted-foreground">
                        {/* +150% from last month */}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Web Traffic (In 2 months)
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{tabData.visitors}</div>
                      <p className="text-xs text-muted-foreground">
                        {/* +42% since last month */}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 bg-foreground">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3 bg-foreground">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>Recent Update</CardTitle>
                        <Link href={'dashboard/transactions'}>
                          <Button variant={"outline"} color="green">View all</Button>
                        </Link>
                      </div>
                      <CardDescription>
                        Newly updated subscription
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </>
  )
}