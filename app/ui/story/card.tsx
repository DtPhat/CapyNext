"use client"
import { TagIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import Link from "next/link";

interface StoryCard {
  data: {
    image: string,
    title: string,
    lastUpdated: string,
    length: number,
    summary: string,
    level?: number,
    topic?: string,
  }
}
export default function StoryCard({ data: { image, title, lastUpdated, length, summary, level, topic } }: StoryCard) {
  return (
    <Card className="hover:bg-accent/20 overflow-hidden relative">
      <CardHeader
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src={image}
          alt="ui/ux review check"
          className="h-56 w-full object-cover"
        />
        {/* <div className="flex items-center gap-2 justify-between absolute bottom-2 right-2">
                    <div className="bg-primary w-6 h-6 text-center rounded-md text-white">3</div>
                  </div> */}
      </CardHeader>
      <CardBody className="flex flex-col gap-1 p-4">
        <Typography className="text-lg font-semibold" color="black">
          {title}
        </Typography>
        <p className="text-xs">{lastUpdated} · {length} min read</p>
        <Typography color="gray" className="font-normal text-sm">
          {summary}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center px-4 pt-0">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 justify-between">
            <div className="bg-primary w-6 h-6 text-center rounded-md text-white">3</div>
            <div className="text-sm">
              Upper-Intermediate
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TagIcon className="w-5 h-5" />
            <span className="text-sm">
              {topic}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export function MiniStoryCard({ data: { image, title, lastUpdated, length, summary, level, topic } }: StoryCard) {
  return (
    <Link href='/stories/thispage'>
      <Card className="hover:bg-accent/20 overflow-hidden relative">
        <CardHeader
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={image}
            alt="ui/ux review check"
            className="h-56 w-full object-cover"
          />
          <div className="flex items-center justify-center absolute bottom-2 left-2 border rounded-md">
            <div className="bg-primary w-8 h-8 text-center rounded-md text-white pt-0.5 text-lg">3</div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-1 p-4">
          <Typography className="text-lg font-semibold" color="black">
            {title}
          </Typography>
          <p className="text-xs text-black/50">{lastUpdated} · {length} min read</p>
          <Typography className="font-normal text-sm text-black/80">
            {summary}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  )
}