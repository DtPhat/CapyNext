'use client'
import {
  IconButton,
  Option,
  Select,
  Tooltip
} from "@material-tailwind/react";
import { FilterX } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface MenuCheckbox {
  name: string,
  checklist?: string[],
}

export default function MenuCheckbox({ name, checklist }: MenuCheckbox) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [paramState, setParamState] = useState<string>();
  const handleSelect = (val: string | undefined) => {
    if (val) {
      setParamState(val)
      params.set(name, val);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (!params?.size) {
      setParamState(undefined)
    }
  }, [pathname, params?.size]);
  return (
    <Suspense>
      <div className="w-52">
        <Select color="gray"
          label={`Select ${name}`}
          className="normal-case text-md flex gap-2 py-2 px-4 bg-foreground border-2"
          onChange={(val) => handleSelect(val)}
          value={paramState}
        >
          {
            checklist?.map(item =>
              <Option
                key={item}
                value={item}>
                {item}
              </Option>
            )
          }
        </Select>
      </div>
    </Suspense>

  );
}

export const ClearFilter = () => {
  const router = useRouter();
  const pathname = usePathname()
  return (
    <Tooltip content="Clear filter" className='bg-foreground text-black border' placement="bottom">
      <IconButton onClick={() => router.push(pathname)} className="bg-foreground border-2">
        <FilterX className='size-7 text-black' />
      </IconButton>
    </Tooltip>
  )
}