import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          <CardDescription>All videos in your library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Published Videos</CardTitle>
          <CardDescription>Videos available to viewers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">189</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
          <CardDescription>All stories in your library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">132</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Published Stories</CardTitle>
          <CardDescription>Stories available to readers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98</div>
        </CardContent>
      </Card>
    </div>
  )
}

