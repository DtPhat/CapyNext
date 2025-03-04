"use client"
import { ConfirmDialog } from "@/components/dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteFetcher } from "@/lib/config/fetchter";
import { CollectionItem } from "@/lib/definitions";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from "@material-tailwind/react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface VocabCardProps {
  vocabulary: CollectionItem
}
export default function VocabCard({ vocabulary }: VocabCardProps) {
  const { _id, sourceText, translation, collectionId } = vocabulary
  const { data, trigger, isMutating } = useSWRMutation(`/vocabularies/${_id}`, deleteFetcher)
  return (
    <>
      <Card className="mt-4 border-2 bg-foreground">
        <CardBody className='py-2'>
          <div className='flex justify-between gap-4 py-2 items-center divide-x-2 h-full'>
            <div className="grid grid-cols-2 gap-4 w-full divide-x-2">
              <div className="col-span-1">
                <p className="text-sm font-normal">Source text</p>
                <Typography color="blue-gray"
                  className="text-lg font-semibold"
                >
                  {sourceText}
                </Typography>
              </div>
              <div className="col-span-1 pl-4">
                <p className="text-sm font-normal">Translation</p>
                <Typography color="blue-gray"
                  className="text-lg font-semibold text-brown-primary"
                >
                  {translation}
                </Typography>
              </div>
            </div>
            <Menu>
              <MenuHandler>
                <IconButton variant="text">
                  <EllipsisVerticalIcon className="w-8 h-8" />
                </IconButton>
              </MenuHandler>
              <ConfirmDialog
                onConfirm={() => trigger()
                  .then(reposne => {
                    mutate('/collections')
                    mutate(`/collections/${collectionId}`)
                    mutate(`/vocabularies/${collectionId}`)
                    mutate(
                      key => typeof key === 'string' && key.startsWith('/vocabularies')
                    )
                    return reposne
                  })}
                loading={isMutating}
                data={data}
                toastMessage={`Chosen vocab was deleted successfully`}
                OpenButton={
                  <MenuList className="flex flex-col divide-y-2 border-black/20 p-1 bg-foreground">
                    <MenuItem className="flex items-center gap-4 ">
                      <div className="flex items-center gap-2 ">
                        <TrashIcon className="w-5 h-5" />
                        <Typography className="font-semibold">
                          Delete
                        </Typography>
                      </div>
                    </MenuItem>
                  </MenuList>
                }
              />
            </Menu>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
