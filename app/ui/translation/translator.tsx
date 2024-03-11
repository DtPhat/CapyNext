'use client'
import { useState } from "react"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
interface TranslatorProps {
  position?: {
    x: number,
    y: number
  },
  textToTranslate: string
}
import {
  LanguageIcon,
  ChevronRightIcon,
  PlusIcon,
  ArrowPathIcon
} from "@heroicons/react/24/solid";
import { CreateCollection } from "../collection/create";
import Loader from "../common/loader";
export default function Translator({ position, textToTranslate }: TranslatorProps) {
  const [translatedText, setTranslatedText] = useState()
  const [showingTranslation, setShowingTranslation] = useState(false)
  const [loading, setLoading] = useState(false)
  const callTranslateAPI = async () => {
    if (showingTranslation) {
      setShowingTranslation(false);
      return;
    }
    setLoading(true);
    await fetch('/api/translation', {
      method: "POST",
      body: JSON.stringify({ text: textToTranslate }),
    })
      .then(response => { setShowingTranslation(true); return response.json() })
      .then(data => { setTranslatedText(data.text); }).finally(() => setLoading(false))
  }

  const TranslationContent = <div className="min-w-40 max-w-sm mt-1">
    <div className="flex flex-col gap-4 p-2">
      <div className="">
        <h1 className="mb-1 font-semibold">Source text</h1>
        <p className="rounded border-2 p-1.5 bg-accent/10 max-h-32 overflow-auto">
          {textToTranslate.trim()}
        </p>
      </div>
      <div>
        <h1 className="mb-1 font-semibold">Translation</h1>
        <p className="min-w-20 max-w-sm bg-accent/10 rounded border-2 p-1.5 max-h-32 overflow-auto">
          {translatedText}
        </p>
      </div>
    </div>
    <div className="border-t-2 py-1 px-2 flex justify-end text-sm">
      <Menu offset={10}>
        <MenuHandler>
          <Button className="py-0.5 px-2 rounded flex items-center gap-1 bg-primary">
            <PlusIcon className="w-4 h-4" />
            <span className="normal-case text-xs">Add</span>
            {/* <ChevronRightIcon className="w-4 h-4"/> */}
          </Button>
        </MenuHandler>
        <MenuList className="p-1 text-black bg-foreground flex flex-col gap-1">
          <MenuItem className="flex gap-4 border-2 items-center justify-between py-1">
            <span>Family</span>
            <Chip value="5" size="sm" variant="ghost" className="rounded-full" />
          </MenuItem>
          <MenuItem className="flex gap-4 border-2 items-center justify-between py-1">
            <span>Academic Writing</span>
            <Chip value="11" size="sm" variant="ghost" className="rounded-full" />
          </MenuItem>
          <MenuItem className="flex gap-4 border-2 items-center justify-between py-1">
            <span>Sports</span>
            <Chip value="11" size="sm" variant="ghost" className="rounded-full" />
          </MenuItem>
          <CreateCollection CustomButton={
            <Button variant='text' className="flex items-center p-1 w-full justify-center">
              <PlusIcon className="w-4 h-4" />
              <span className="normal-case text-xs">Create Collection</span>
            </Button>
          }
          />
        </MenuList>
      </Menu>
    </div>
  </div>

  return (
    <div className="pt-2 z-50"
      style={{ position: position ? 'absolute' : 'static', left: position?.x, top: position?.y }}>
      <Tooltip open={showingTranslation}
        className='bg-foreground text-black border-2 p-0'
        content={TranslationContent}>
        <IconButton
          onClick={callTranslateAPI}
          className="bg-primary border w-7 h-7 rounded-lg">
          {loading ?
            <Loader />
            : <LanguageIcon className="w-5" />}
        </IconButton>
      </Tooltip>

    </div>
  );
}