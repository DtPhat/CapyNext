"use client"

import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Video } from "@/lib/definitions"
import { updateVideo, createVideo, getParsedTranscript } from "../_lib/action"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Button as MuiButton } from "@material-tailwind/react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import ButtonIcon from "@/components/button-icon"
import { PlusIcon, Sparkle, SparkleIcon, Trash, TrashIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import TranscriptDialog from "./transcript-dialog"

const formSchema = z.object({
  caption: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
  channel: z.string().min(1, "Channel is required"),
  videoId: z.string().min(1, "Video ID is required"),
  thumbnail: z.string().min(1, "Thumbnail URL is required"),
  duration: z.number().min(0, "Duration must be a positive number"),
  transcripts: z.array(
    z.object({
      sentence: z.string().min(1),
      timestamp: z.number().min(0),
      translation: z.string().min(1),
    })
  ),
  isPremium: z.boolean(),
})

interface VideoFormProps {
  initialData?: Video
}

export function VideoForm({ initialData }: VideoFormProps) {
  const [openTranscriptDialog, setOpenTranscriptDialog] = useState(false)
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: initialData?.caption || "",
      category: initialData?.category || "",
      level: initialData?.level || "",
      channel: initialData?.channel || "",
      videoId: initialData?.videoId || "",
      thumbnail: initialData?.thumbnail || "",
      duration: initialData?.duration || 0,
      transcripts: initialData?.transcripts || [],
      isPremium: initialData?.isPremium || false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "transcripts",
  })

  const handleParsedTranscript = async (rawText: string) => {
    try {
      setIsLoadingTranscript(true)
      const parsedTranscript = await getParsedTranscript(rawText)
      const currentTranscripts = form.getValues("transcripts") || [];
      form.setValue("transcripts", [...currentTranscripts, ...parsedTranscript]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse transcript",
        variant: "destructive"
      })
    } finally {
      setOpenTranscriptDialog(false)
      setIsLoadingTranscript(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (initialData) {
        await updateVideo(initialData._id, values)
        toast({ title: "Success", description: "Video updated successfully" })
      } else {
        await createVideo(values)
        toast({ title: "Success", description: "Video created successfully" })
      }
      router.push("/dashboard/videos")
      router.refresh()
    } catch (error) {
      toast({ title: "Error", description: "Operation failed", variant: "destructive" })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Video title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    ["Science", "Culture", "Education", "Technology", "Entertainment", "History", "News", "Business", "Fantasy", "Adventure"]
                      .map(category => <SelectItem
                        key={category} value={category}
                        className="capitalize"
                      >
                        {category}
                      </SelectItem>)
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="channel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel</FormLabel>
              <FormControl>
                <Input placeholder="Channel name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="videoId" render={({ field }) => (
          <FormItem>
            <FormLabel>Video ID</FormLabel>
            <FormControl>
              <Input placeholder="Video ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="thumbnail" render={({ field }) => (
          <FormItem>
            <FormLabel>Thumbnail URL</FormLabel>
            <FormControl>
              <Input placeholder="Thumbnail URL" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="duration" render={({ field }) => (
          <FormItem>
            <FormLabel>Duration (seconds)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="Duration in seconds"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField
          control={form.control}
          name="isPremium"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base cur">Premium</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <div className="flex gap-8">
            <FormLabel>Transcript</FormLabel>
          </div>
          <Button type="button" className="w-fit gap-1" onClick={() => setOpenTranscriptDialog(true)}>
            <SparkleIcon />Generate
          </Button>
          <TranscriptDialog
            open={openTranscriptDialog}
            onOpenChange={setOpenTranscriptDialog}
            onSubmit={handleParsedTranscript}
            loading={isLoadingTranscript}
          />
          <div className="grid grid-cols-[1fr_100px_1fr_40px] gap-2 items-center font-medium text-sm px-1 mb-2">
  <span>Sentence</span>
  <span>Time</span>
  <span>Translation</span>
  <span></span>
</div>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_100px_1fr_40px] gap-2">
              <Input {...form.register(`transcripts.${index}.sentence`)} placeholder="Sentence" />
              <Input type="number" {...form.register(`transcripts.${index}.timestamp`, {
                valueAsNumber: true,
              })} placeholder="Timestamp" />
              <Input {...form.register(`transcripts.${index}.translation`)} placeholder="Translation" />
              <Button type="button" className="p-2" variant={"destructive"} onClick={() => remove(index)}><TrashIcon className=""/></Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="gap-2">
            <Button type="button" onClick={() => append({ sentence: "", timestamp: 0, translation: "" })}>
              <PlusIcon /> Add a sentence
            </Button>
          </div>
          <div className="mt-4">
            <MuiButton color="green" type="submit">{initialData ? "Save Changes" : "Create Video"}</MuiButton>
          </div>
        </div>
      </form>
    </Form>
  )
}
