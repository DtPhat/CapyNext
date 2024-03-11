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
import { NavigateButtonIcon } from "../common/button-icon";

export default function CollectionCard() {
  return (
    <Card className="mt-6 w-96 border-2">
      <CardBody className='py-2'>
        <div className='flex justify-between gap-2 py-4'>
          <div className="rounded-full">
            <HomeIcon className="w-12 h-12" />
          </div>
          <Typography color="blue-gray" className="text-lg font-semibold hover:text-primary cursor-pointer">
            Academic Writing
          </Typography>
          <Menu>
            <MenuHandler>
              <IconButton variant="text">
                <EllipsisVerticalIcon className="w-8 h-8" />
              </IconButton>
            </MenuHandler>
            <MenuList className="flex flex-col divide-y-2 border-black/20 p-1">
              <MenuItem className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-5 h-5"/>
                  <Typography color="gray" className="font-semibold">
                    View
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <PencilIcon className="w-5 h-5"/>
                  <Typography color="gray" className="font-semibold">
                    Edit
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4 ">
                <div className="flex items-center gap-2 ">
                  <TrashIcon className="w-5 h-5"/>
                  <Typography color="gray" className="font-semibold">
                    Delete
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className='flex justify-between font-semibold px-2'>
          <p className='text-inherit'>29 total</p>
          |<p className='text-blue-700'>5 new</p>
          |<p className='text-red-700'>4 due</p>
          |<p className='text-green-700'>5 active</p>
        </div>
      </CardBody>
      <CardFooter className="p-2 flex justify-end pr-4">
          <NavigateButtonIcon linkTo="/game/flashcard" text="Go Practice"/>
      </CardFooter>
    </Card>
  )
}
