"use client"
import { TagIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import Link from "next/link";
import SearchBar from "../ui/common/searchbar";
import MenuCheckbox from "../ui/common/menu-checkbox";
import ReadingCard from "../ui/story/card";
import { ENGLISH_LEVELS } from "../lib/constants";
import { storyList } from "../lib/placeholder-data";

export default function Lessons() {
  return (
    <section className="px-16 py-8 flex flex-col gap-4 max-w-7xl">
      <div className="grid grid-cols-2 border-b-2 pb-2 border-black/50">
        <SearchBar placeholder="Search lessons..." />
        <div className="flex justify-end items-center gap-4">
          <MenuCheckbox name="Topic" checklist={["News", "Business", "Education", "Technology", "Entertainment"]} />
          <MenuCheckbox name="Level" checklist={ENGLISH_LEVELS} />
        </div>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {
          storyList.map(item =>
            <Link href='/stories/story' key={item.title}>
              <ReadingCard data={item} />
            </Link>
          )
        }
      </div>
    </section>

  );
}