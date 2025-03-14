"use client"
import Premium from "@/components/premium";
import { LEVEL_NUMBERS } from "@/lib/constants";
import { Level, Video } from "@/lib/definitions";
import { capText } from "@/lib/helpers/string";
import { formatSeconds } from "@/lib/helpers/time";
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
export default function VideoCard({ data: { _id, caption, channel, duration, thumbnail, videoId, category, level, isPremium } }: VideoCardProps) {
  return (
    // <Premium isPremium={isPremium} _id={_id} contentType="videos">
      <Card className="overflow-hidden group relative hover:bg-primary/5 bg-foreground">
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
          <div className="absolute-center hidden group-hover:block ">
            <PlayCircleIcon className="w-28 h-28 opacity-50" />
          </div>
          <div className="absolute flex items-center gap-2 justify-between bottom-2 right-2 bg-black/50">
            <div className="bg-black px-2 text-center rounded text-white">{formatSeconds(duration)}</div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-1 p-4">
          <Typography className="text-lg font-semibold h-16 line-clamp-2" color="black">
            {caption}
          </Typography>
          <p className="text-sm">{channel}</p>
        </CardBody>
        <CardFooter className="flex items-center px-4 pt-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 justify-between">
              <div className="bg-primary w-6 h-6 text-center rounded-md text-white">{LEVEL_NUMBERS[level as Level]}</div>
              <div className="text-sm">
                {level}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <TagIcon className="w-5 h-5" />
              <span className="text-sm">
                {category}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    // </Premium>
  )
}

export function MiniVideoCard({ data: { _id, caption, channel, duration, thumbnail, category, level, isPremium } }: VideoCardProps) {
  return (
    <Premium isPremium={isPremium} _id={_id} contentType="videos">
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
          <div className="absolute-center hidden group-hover:block">
            <PlayCircleIcon className="w-28 h-28 opacity-50" />
          </div>
          <div className="absolute flex items-center gap-2 justify-between bottom-2 right-2 bg-black/50 text-lg">
            <div className="bg-black px-2 text-center rounded text-white">{formatSeconds(duration)}</div>
          </div>
          <div className="flex items-center justify-center absolute bottom-2 left-2 border rounded-md">
            <div className="bg-primary w-8 h-8 text-center rounded-md text-white pt-0.5 text-lg">{LEVEL_NUMBERS[level as Level]}</div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-1 pt-2 pb-4 px-4 group-hover:bg-primary/5">
          <Typography className="font-semibold text-lg h-16" color="black">
            {caption}
          </Typography>
          <p className="text-sm">{channel}</p>
        </CardBody>
      </Card>
    </Premium>

  )
}
