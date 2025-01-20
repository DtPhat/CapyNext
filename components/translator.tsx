'use client'
import { ReactNode, useState } from "react"
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
import { CreateCollection } from "@/app/collections/_components/create";
import Loader from "@/components/loader";
import useSWR, { mutate } from "swr";
import { Collection } from "@/lib/definitions";
import { postFetcher } from "@/lib/config/fetchter";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from 'next/navigation'
import useSWRMutation from "swr/mutation";
import { useAuth } from "@/providers/auth";

export default function Translator({ position, textToTranslate }: TranslatorProps) {
  const [translatedText, setTranslatedText] = useState<string>()
  const [showingTranslation, setShowingTranslation] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: collections, isLoading } = useSWR<Collection[]>('/collections')
  const callTranslateAPI = async () => {
    if (showingTranslation) {
      setShowingTranslation(false);
      setTranslatedText('')
      return;
    }
    setLoading(true);
    await fetch('/api/translate', {
      method: "POST",
      body: JSON.stringify({ text: textToTranslate }),
    })
      .then(response => { setShowingTranslation(true); return response.json() })
      .then(data => { setTranslatedText(data.text); })
      .finally(() => setLoading(false))
  }
  const { trigger } = useSWRMutation('/vocabularies', postFetcher)
  const addVocabToCollection = async (collection: Collection) => {
    console.log(collection)
    if (!collection) return
    await trigger({
      sourceText: textToTranslate,
      translation: translatedText,
      collectionId: collection._id
    })
      .then(response => {
        console.log(response)
        if (response) {
          toast({
            title: `Add to ${collection.name}`,
            description: "The source text and its translation has been added.",
            variant: "default",
            action: <ToastAction
              onClick={() => router.push('/collections')}
              altText="My Collection"
              className="border-black hover:bg-gray-200">
              My Collections
            </ToastAction>,
          })
        }
      })
      .finally(() => {
        mutate('/collections')
        mutate(`/vocabularies/${collection._id}`)

      })
  }


  const TranslationContent: ReactNode = (
    <div className="min-w-40 max-w-sm mt-1">
      <div className="flex flex-col gap-4 p-2">
        <div className="">
          <h1 className="mb-1 font-semibold">Source text</h1>
          <p className="rounded border-2 p-1.5 bg-black/5 max-h-32 overflow-auto">
            {textToTranslate.trim()}
          </p>
        </div>
        <div>
          <h1 className="mb-1 font-semibold">Translation</h1>
          <p className="min-w-20 max-w-sm bg-black/65 text-white rounded border-2 p-1.5 max-h-32 overflow-auto">
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
            </Button>
          </MenuHandler>
          <MenuList className="p-1 text-black bg-foreground flex flex-col gap-1">
            {
              collections?.map(collection =>
                <MenuItem
                  key={collection._id}
                  className="flex gap-4 border-2 items-center justify-between py-0.5"
                  onClick={() => addVocabToCollection(collection)}>
                  <div className="rounded-full border-2">
                    <img className="w-8 h-8" src={collection.picture} />
                  </div>
                  <div className="text-ellipsis max-w-32">
                    <p className="truncate">
                      {collection.name}
                    </p>
                  </div>
                  <Chip value={collection.totalVocab} size="sm" variant="ghost" className="rounded-full" />
                </MenuItem>)
            }
            <CreateCollection OpenButton={
              <Button variant='text' className="flex items-center p-1 w-full justify-center gap-1">
                <PlusIcon className="w-4 h-4" />
                <span className="normal-case text-xs">Create Collection</span>
              </Button>
            }
            />
          </MenuList>
        </Menu>
      </div>
    </div >
  )

  return (
    <div className="pt-2 z-50"
      style={{ position: position ? 'absolute' : 'static', left: position?.x, top: position?.y }}>
      <Tooltip open={showingTranslation}
        className='bg-foreground text-black border-2 p-0'
        content={TranslationContent}>
        <IconButton
          onClick={callTranslateAPI}
          className="bg-primary border w-7 h-7 rounded-lg">
          {loading
            ? <Loader />
            : <LanguageIcon className="w-5" />}
        </IconButton>
      </Tooltip>

    </div>
  );
}