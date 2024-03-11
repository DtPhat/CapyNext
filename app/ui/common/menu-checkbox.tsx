'use client'
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";

interface MenuCheckbox {
  name?: string,
  checklist?: string[],
}

export default function MenuCheckbox({ name, checklist }: MenuCheckbox) {
  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button variant='text' className="normal-case text-md flex gap-2 py-2 px-4 border-black/50 border-2">
          <span>{name}</span>
          <ChevronDownIcon className="w-6 h-6 stroke-2" />
        </Button>
      </MenuHandler>
      <MenuList className="bg-foreground border-2 border-black/50">
        {
          checklist?.map(item =>
            <MenuItem className="p-0" key={item}>
              <label
                htmlFor={item}
                className="flex cursor-pointer items-center gap-2 p-2"
              >
                <Checkbox
                  ripple={false}
                  id={item}
                  containerProps={{ className: "p-0" }}
                  className="hover:before:content-none"
                />
                {item}
              </label>
            </MenuItem>
          )}
      </MenuList>
    </Menu>
  );
}