'use client'
import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

type DismissType = {
  enabled?: boolean;
  escapeKey?: boolean;
  referencePress?: boolean;
  referencePressEvent?: "pointerdown" | "mousedown" | "click";
  outsidePress?: boolean | ((event: MouseEvent) => boolean);
  outsidePressEvent?: "pointerdown" | "mousedown" | "click";
  ancestorScroll?: boolean;
  bubbles?:
  | boolean
  | {
    escapeKey?: boolean;
    outsidePress?: boolean;
  };
};

export default function DrawerUI() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const dismiss: DismissType = {
    outsidePress: false
  }
  return (
    <div>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4" overlay={false} dismiss={dismiss}>
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
          <Button size="sm" variant="outlined">
            Documentation
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </Drawer>
    </div>
  );
}