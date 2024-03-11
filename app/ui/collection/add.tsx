import React from 'react'
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
import { PlusIcon } from '@heroicons/react/24/solid';
type CollectionMenuProps = {
  handlerButton?: JSX.Element
}

const CollectionMenu = ({ handlerButton }: CollectionMenuProps) => {
  return (
    <Menu offset={10}>
      <MenuHandler>
        {
          handlerButton ||
          <Button className="py-0.5 px-2 rounded flex items-center gap-1 bg-primary">
            <PlusIcon className="w-4 h-4" />
            Add
            {/* <span className=" normal-case text-sm">Add</span> */}
            {/* <ChevronRightIcon className="w-4 h-4"/> */}
          </Button>
        }
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

      </MenuList>
    </Menu>
  )
}

export default CollectionMenu