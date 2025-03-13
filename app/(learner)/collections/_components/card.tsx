"use client"
import { EllipsisVerticalIcon, EyeIcon, HomeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { NavigateButtonIcon } from "@/components/button-icon";
import { deleteFetcher } from "@/lib/config/fetchter";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/dialog";
import useSWRMutation from 'swr/mutation'
import { mutate } from "swr";
import { UpdateCollection } from "./update";
import { Collection } from "@/lib/definitions";

interface CollectionCardProps {
  collection: Collection
}
export default function CollectionCard({ collection }: CollectionCardProps) {
  const { _id, name, description, picture = "", totalVocab = 0 } = collection
  const router = useRouter()
  const { data, trigger, isMutating } = useSWRMutation(`/collections/${_id}`, deleteFetcher)

  return (
    <>
      <Card className="mt-4 border-2 bg-foreground">
        <CardBody className='py-2'>
          <div className='flex justify-between gap-2 py-2'>
            <div className="rounded-full border-2 bg-gradient-to-r from-primary/80 to-accent/40 min-w-20 max-h-24">
              <img className="w-20 h-20 rounded-full object-cover hover:cursor-pointer" src={picture}
                onClick={() => router.push("/collections/" + collection._id)}
              />
            </div>
            <div>
              <Typography color="blue-gray"
                className="text-lg font-semibold hover:text-primary cursor-pointer"
                onClick={() => router.push("/collections/" + collection._id)}
              >
                {name}
              </Typography>
              <Typography color="blue-gray" className="">
                {totalVocab} saved words
              </Typography>
            </div>
            <Menu>
              <MenuHandler>
                <IconButton variant="text">
                  <EllipsisVerticalIcon className="w-8 h-8" />
                </IconButton>
              </MenuHandler>
              <MenuList className="flex flex-col divide-y-2 border-black/20 p-1 bg-foreground gap-1">
                <MenuItem className="flex items-center gap-4" onClick={() => router.push("/collections/" + collection._id)}>
                  <div className="flex items-center gap-2">
                    <EyeIcon className="w-5 h-5" />
                    <Typography color="gray" className="font-semibold">
                      View
                    </Typography>
                  </div>
                </MenuItem>
                <UpdateCollection
                  collection={collection}
                  OpenButton={
                    <MenuItem className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <PencilIcon className="w-5 h-5" />
                        <Typography color="gray" className="font-semibold">
                          Edit
                        </Typography>
                      </div>
                    </MenuItem>
                  }
                />
                <ConfirmDialog
                  onConfirm={() => trigger()
                    .then(response => {
                      mutate('/collections')
                      mutate(`/collections/${collection._id}`)
                      mutate(`/vocabularies/${collection._id}`)
                      return response
                    })
                  }
                  loading={isMutating}
                  data={data}
                  toastMessage={`Collection ${name} was deleted successfully`}
                  OpenButton={
                    <MenuItem className="flex items-center gap-4 ">
                      <div className="flex items-center gap-2 ">
                        <TrashIcon className="w-5 h-5" />
                        <Typography color="gray" className="font-semibold">
                          Delete
                        </Typography>
                      </div>
                    </MenuItem>
                  }
                />
              </MenuList>
            </Menu>
          </div>
          <p className="line-clamp-1">
            {description}
          </p>
          {/* <div className='flex justify-between font-semibold px-2'>
          <p className='text-inherit'>29 total</p>
          |<p className='text-blue-700'>5 new</p>
          |<p className='text-red-700'>4 due</p>
          |<p className='text-green-700'>5 active</p>
        </div> */}
        </CardBody>
        <CardFooter className="p-2 flex justify-end pr-4">
          <NavigateButtonIcon linkTo="/game/flashcard" text="Go Practice" disabled={totalVocab <= 1} />
        </CardFooter>
      </Card>
    </>

  )
}
