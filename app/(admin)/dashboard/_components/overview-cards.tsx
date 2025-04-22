import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStories, getUsers, getVideos } from "../_lib/actions";

export default async function OverviewCards() {
  const [videos, stories, users] = await Promise.all([
    getVideos(),
    getStories(),
    getUsers(),
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Total Videos</CardTitle>
          <CardDescription>All videos in your library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{videos?.data.length || 0}</div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Published Videos</CardTitle>
          <CardDescription>Videos available to viewers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">189</div>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Total Stories</CardTitle>
          <CardDescription>All stories in your library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stories?.data.length || 0}</div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Published Stories</CardTitle>
          <CardDescription>Stories available to readers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98</div>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Total users</CardTitle>
          <CardDescription>All active users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users?.data.length || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
}
