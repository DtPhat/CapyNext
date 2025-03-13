"use client"
import ButtonIcon from "@/components/button-icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from '@/components/ui/use-toast';
import { postFetcher } from '@/lib/config/fetchter';
import { Collection } from '@/lib/definitions';
import { LanguageIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography
} from "@material-tailwind/react";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { mutate } from 'swr';
import useSWRMutation from "swr/mutation";
import { z } from "zod";
const formSchema = z.object({
  sourceText: z.string().min(1, {
    message: "Name must be at least 2 characters.",
  }),
})
export function CreateVocab({ collection }: { collection: Collection }) {
  const [open, setOpen] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceText: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false);

  const fetchTranslatedText = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: form.getValues().sourceText }),
      });
      const data = await response.json();
      setTranslatedText(data.text);
    } finally {
      setIsLoading(false);
    }
  };

  const { trigger, isMutating } = useSWRMutation('/vocabularies', postFetcher)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let submittingTranslation
    if (!translatedText) {
      submittingTranslation = await fetch('/api/translate', {
        method: "POST",
        body: JSON.stringify({ text: form.getValues().sourceText }),
      })
        .then(response => { return response.json() })
        .then(result => { return result.text })
    }
    await trigger({
      sourceText: values.sourceText,
      translation: translatedText || submittingTranslation,
      collectionId: collection._id
    })
      .then(response => {
        if (response) {
          toast({
            title: `Add to ${collection.name}`,
            description: "The source text and its translation has been added.",
            variant: "default",
          })
        }
      })
      .finally(() => {
        mutate(`/collections`)
        mutate(`/collections/${collection._id}`)
        mutate(`/vocabularies/${collection._id}`)
        form.reset()
        setTranslatedText("")
        handleOpen()
      })
  }

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div>

        <ButtonIcon
          Icon={<PlusIcon className="w-8 h-8" />}
          text="Add vocabulary"
          iconDirection="left"
          variant="filled"
          onClick={handleOpen}
        />
      </div>
      <Dialog open={open} size="md" handler={handleOpen}>
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h4">
            Add a new vocabulary
          </Typography>
          <IconButton
            className="mx-4"
            variant="text"
            onClick={handleOpen}
          >
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="sourceText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source text</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="English words"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <div className="flex flex-col gap-2">
            {/* <ButtonIcon
              variant="text"
              color="green"
              onClick={fetchTranslatedText}
              text="Translate"
              Icon={<LanguageIcon className="w-5 h-5" />}
              iconDirection="left"
              disabled={!isLoading}
            /> */}
            <div>
            <Button color="green" variant="text" className="p-2 flex items-center gap-1 text-sm"
              disabled={isLoading}
              loading={isLoading}
              onClick={fetchTranslatedText}
              >
              <LanguageIcon className="w-5 h-5" />
              <div>Translate</div>
            </Button>
              </div>
            <div className="pl-2">{translatedText}</div>
          </div>
        </DialogBody>
        <DialogFooter className="flex items-center gap-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => {
              handleOpen()
              form.reset()
              setTranslatedText("")
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="green"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isMutating}
            loading={isMutating}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

