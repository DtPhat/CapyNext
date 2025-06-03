"use client"
import { LEVEL_NUMBERS } from "@/lib/constants";
import { Level, Story } from "@/lib/definitions";
import { convertDateFormat } from "@/lib/helpers/time";
import { TagIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import Link from "next/link";
import { estimateReadingTime } from "../_lib/utils";
import Premium from "@/components/premium";
interface StoryCard {
  data: Story
}
export default function StoryCard({ data: { _id, display_image, title, description, level, category, contents, isPremium, updatedAt } }: StoryCard) {
  return (
    // <Premium isPremium={isPremium} _id={_id} contentType="stories">
      <Card className="hover:bg-accent/5 overflow-hidden relative bg-foreground border-2">
        <CardHeader
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={display_image}
            alt="story picture"
            className="h-56 w-full object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-1 p-4">
          <Typography className="text-lg font-semibold" color="black">
            {title}
          </Typography>
          <p className="text-xs">{convertDateFormat(updatedAt)} · {estimateReadingTime(contents[0].text)} min read</p>
          <Typography color="gray" className="font-normal text-sm h-14">
            <p className="line-clamp-3">
              {description}
            </p>
          </Typography>
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
                {category?.name}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    // </Premium>
  )
}

export function MiniStoryCard({ data: { display_image, title, description, contents, updatedAt, level, isPremium, _id } }: StoryCard) {
  return (
    <Premium isPremium={isPremium} _id={_id} contentType="stories">
      <Card className="hover:bg-accent/5 overflow-hidden relative bg-foreground">
        <CardHeader
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={display_image}
            alt="Display image"
            className="h-48 w-full object-cover"
          />
          <div className="flex items-center justify-center absolute bottom-2 left-2 border rounded-md">
            <div className="bg-primary w-8 h-8 text-center rounded-md text-white pt-0.5 text-lg">{LEVEL_NUMBERS[level as Level]}</div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-1 p-4">
          <Typography className="text-lg font-semibold" color="black">
            <p className="line-clamp-1">
              {title}
            </p>
          </Typography>
          <p className="text-xs text-black/50">{convertDateFormat(updatedAt)} · {estimateReadingTime(contents[0].text)} min read</p>
          <p className="font-normal text-sm text-black/80 line-clamp-2">
            {description}
          </p>
        </CardBody>
      </Card>
    </Premium>
  )
}