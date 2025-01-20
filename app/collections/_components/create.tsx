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
import { useToast } from '@/components/ui/use-toast';
import { postFetcher } from '@/lib/config/fetchter';
import { collectionPictures } from '@/lib/constants';
import { Collection } from '@/lib/definitions';
import { cn } from '@/lib/helpers/utils';
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
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
import { ReactNode, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  picture: z.string(),
})
export function CreateCollection({ OpenButton }: { OpenButton?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const imgInput = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      picture: collectionPictures[0],
    },
  })
  const { toast } = useToast()
  form.watch('picture')
  const { trigger } = useSWRMutation("/collections", postFetcher, { revalidate: true })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await trigger(values)
      .then(response => {
        if (response) {
          toast({
            title: "Collection created successfully",
            description: "Your action was completed",
          })
        }
      })
      .finally(() => {
        handleOpen();
        form.reset()
      })
  }


  const handleOpen = () => setOpen(!open);
  return (
    <>
      {
        OpenButton
          ? <button onClick={handleOpen}>
            {OpenButton}
          </button>
          : <div>
            <ButtonIcon onClick={handleOpen}
              Icon={<PlusIcon className="w-8 h-8" />}
              iconDirection="left"
              className="max-w-64"
              text="Create Collection"
              variant="filled"
            />
          </div>
        // : <Button onClick={handleOpen} className="flex items-center justify-center gap-1 bg-primary text-lg max-w-64 py-2 rounded-lg">
        //   <PlusIcon className="w-8 h-8" />
        //   <span className='normal-case'>Create Collection</span>
        // </Button>
      }
      <Dialog open={open} size="md" handler={handleOpen}>
        <div className="flex items-center justify-between ">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Create new collection
            </Typography>
          </DialogHeader>
          <IconButton className="mx-4" variant="text" onClick={handleOpen}>
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <DialogBody className="flex flex-col gap-4">
          <Form {...form}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Collection" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="My descriptions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="items-center">
                <div className='text-sm pb-2'>Thumbnail</div>
                <div className="flex flex-wrap gap-4">
                  {
                    collectionPictures.map(picture =>
                      <button
                        onClick={() => form.setValue('picture', picture)}
                        key={picture}
                        className={cn("rounded-full w-16 h-16 p-2 hover:bg-gray-100",
                          form.getValues().picture == picture ? 'bg-gray-200 border-4 border-accent ' : 'border-2')}
                      >
                        <img src={picture} className='object-cover' />
                      </button>
                    )
                  }
                  <button className='border-2 border-dashed border-gray-400 rounded-full w-16 h-16 p-2 hover:bg-gray-100 items-center justify-center'
                    onClick={() => imgInput.current?.click()}>
                    <PlusIcon className="w-12 h-12 text-gray-400" />
                  </button>
                  <input type='file' className='hidden' accept="image/*" ref={imgInput} />
                </div>
              </div>
            </div>
          </Form>

        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant='text' color="gray" onClick={() => {
            handleOpen()
            form.reset()
          }}>
            Cancel
          </Button>
          <Button type="submit" color='green' onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

