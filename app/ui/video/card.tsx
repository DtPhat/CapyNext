"use client"
import { Video } from "@/app/lib/definitions";
import { PlayCircleIcon, TagIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import Link from "next/link";

interface VideoCardProps {
  data: Video,
}
export default function VideoCard({ data: { title, channel, duration, thumbnail, url, topic, level } }: VideoCardProps) {
  return (
    <Card className="overflow-hidden group relative">
      <CardHeader
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src={thumbnail}
          alt="ui/ux review check"
          className="transition duration-400 ease-in-out group-hover:scale-105"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block ">
          <PlayCircleIcon className="w-28 h-28 opacity-50" />
        </div>
        <div className="absolute flex items-center gap-2 justify-between bottom-2 right-2 bg-black/50">
          <div className="bg-black px-2 text-center rounded text-white">{duration}</div>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-1 p-4 group-hover:bg-accent/10">
        <Typography className="text-lg font-semibold h-16" color="black">
          {title}
        </Typography>
        <p className="text-sm">{channel}</p>
      </CardBody>
      <CardFooter className="flex items-center px-4 pt-0 group-hover:bg-accent/10">
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

export function MiniVideoCard({ data: { title, channel, duration, thumbnail, url, topic, level } }: VideoCardProps) {
  return (
    <Link href='/videos/thispage'>
      <Card className="overflow-hidden group relative">
        <CardHeader
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={thumbnail}
            alt="ui/ux review check"
            className="transition duration-400 ease-in-out group-hover:scale-105"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
            <PlayCircleIcon className="w-28 h-28 opacity-50" />
          </div>
          <div className="absolute flex items-center gap-2 justify-between bottom-2 right-2 bg-black/50 text-lg">
            <div className="bg-black px-2 text-center rounded text-white">{duration}</div>
          </div>
          <div className="flex items-center justify-center absolute bottom-2 left-2 border rounded-md">
            <div className="bg-primary w-8 h-8 text-center rounded-md text-white pt-0.5 text-lg">3</div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-1 pt-2 pb-4 px-4 group-hover:bg-accent/10">
          <Typography className="font-semibold text-lg h-16" color="black">
            {title}
          </Typography>
          <p className="text-sm">{channel}</p>
        </CardBody>
      </Card>
    </Link>
  )
}
