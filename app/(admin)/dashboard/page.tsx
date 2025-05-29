import OverviewChart from "./_components/overview-chart";
import OverviewCards from "./_components/overview-cards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <OverviewCards />
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">User Usage</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <OverviewChart />
        </CardContent>
      </Card>
    </div>
  );
}
