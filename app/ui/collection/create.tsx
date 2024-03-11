import { LegacyRef, MutableRefObject, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { AcademicCapIcon, GlobeAmericasIcon, HomeIcon, LanguageIcon, NewspaperIcon, PlusIcon, PuzzlePieceIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Home from "@/app/home/page";

interface Props {
  CustomButton?: JSX.Element
}

export function CreateCollection({ CustomButton }: Props) {
  const [open, setOpen] = useState(false);
  const imgInput = useRef<HTMLInputElement>(null)

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {
        CustomButton ?
          <button onClick={handleOpen}> {CustomButton}</button>

          : <Button onClick={handleOpen} className="flex items-center justify-center gap-1 bg-primary text-lg max-w-64 py-2 rounded-lg">
            <PlusIcon className="w-8 h-8" />
            <span className='normal-case'>Create Collection</span>
          </Button>
      }
      <Dialog open={open} size="md" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Create new collection
            </Typography>
          </DialogHeader>
          <IconButton className="mx-4" variant="text" onClick={handleOpen}>
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <DialogBody className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Typography className="w-32" color="blue-gray" variant="h6">Name:</Typography>
            <Input label="Collection name" />
          </div>
          <div className="flex items-center">
            <Typography className="w-32" color="blue-gray" variant="h6">Thumbnail:</Typography>
            <div className="flex flex-wrap gap-4">
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <HomeIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <AcademicCapIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <GlobeAmericasIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <LanguageIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <NewspaperIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <HomeIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <AcademicCapIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <GlobeAmericasIcon className="w-full h-full" />
              </button>
              <button className="border rounded-full w-16 h-16 p-2 hover:bg-gray-100">
                <LanguageIcon className="w-full h-full" />
              </button>
              
              <button className='border-2 border-dashed border-gray-400 rounded-full w-16 h-16 p-2 hover:bg-gray-100 items-center justify-center'
                onClick={() => imgInput.current?.click()}>
                  <PlusIcon className="w-12 h-12 text-gray-400"/>
              </button>
              <input type='file' className='hidden' accept="image/*" ref={imgInput} />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleOpen}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}