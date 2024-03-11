'use client'
import {
  BookOpenIcon,
  BookmarkSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  PresentationChartBarIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  Square2StackIcon,
  Squares2X2Icon,
  UserIcon,
  VideoCameraIcon,
  WalletIcon
} from "@heroicons/react/24/solid";
import {
  Card,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../providers";

export default function Sidebar() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    // setOpen(open === value ? 0 : value);
    setOpen(open === value ? 0 : value);
  };
  const navigationList = [
    {
      Icon: HomeIcon,
      name: "Home",
      link: "/home",
      index: 1
    },
    {
      Icon: BookOpenIcon,
      name: "Stories",
      link: "/stories",
      index: 2
    },
    {
      Icon: VideoCameraIcon,
      name: "Videos",
      link: "/videos",
      index: 3
    },
    {
      Icon: PuzzlePieceIcon,
      name: "Game Center",
      link: "/game",
      index: 4,
      subPages: [
        {
          Icon: Square2StackIcon,
          name: "Flashcard",
          link: "/game/flashcard",
          index: 4.1
        },
        {
          Icon: RectangleGroupIcon,
          name: "Matching",
          link: "/game/matching",
          index: 4.2
        },
        {
          Icon: QuestionMarkCircleIcon,
          name: "Word Guessing",
          link: "/game/word-guessing",
          index: 4.3
        },
        {
          Icon: Squares2X2Icon,
          name: "Multiple Choice",
          link: "/game/multiple-choice",
          index: 4.4
        },
      ],
    },

    //personal navigation
    {
      Icon: BookmarkSquareIcon,
      name: "My Collections",
      link: "/collections",
      index: 5
    },
    {
      Icon: WalletIcon,
      name: "Saved Lessons",
      link: "/save",
      index: 6
    },
    {
      Icon: UserIcon,
      name: "Account",
      link: "/user",
      index: 7
    },
  ]
  const pathname = usePathname()


  const { openSidebar } = useContext(LayoutContext)

  const dismiss: DismissType = {
    outsidePress: false
  }

  useEffect(() => {

  }, [pathname]);

  return (
    <div className={`${openSidebar ? 'pr-64' : 'pr-0'}`}>
      <Drawer open={openSidebar} className="z-10 " overlay={false} dismiss={dismiss}>
        <Card className="fixed top-0 h-screen p-2 pt-16 flex flex-col gap-4 w-64 shadow-xl rounded-none select-none border-r-2">
          <List>
            {navigationList.map((item) =>
              item.subPages ?
                <div key={item.name}>
                  <Accordion
                    open={open === 1}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-5 w-5 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                      />
                    }
                  >
                    <ListItem className="p-0" >
                      <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                        <ListItemPrefix>
                          <item.Icon className="h-6 w-6 text-black" />
                        </ListItemPrefix>
                        <Typography className="mr-auto tracking-wide text-black">
                          {item.name}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="p-1 text-black flex flex-col gap-1 pl-1.5">
                      {item.subPages.map(subItem =>
                        <Link href={subItem.link} key={subItem.index}>
                          <ListItem selected={pathname.includes(subItem.link)} key={subItem.index}>
                            <ListItemPrefix>
                              <subItem.Icon className="h-6 w-6" />
                            </ListItemPrefix>
                            <Typography>
                              {subItem.name}
                            </Typography>
                          </ListItem>
                        </Link>
                      )}
                      <Link href={'/game/capyventure'}>
                        <ListItem selected={pathname.includes('/game/capyventure')} className="border-2 bg-accent/20 border-accent p-2">
                          <ListItemPrefix>
                            <img src="/game-icon.png" className="h-6 w-6 rounded-full" />
                          </ListItemPrefix>
                          <Typography className="font-semibold">
                            CapyVenture
                          </Typography>
                        </ListItem>
                      </Link>
                    </AccordionBody>
                  </Accordion >
                  {item.link === '/game' && <hr className="my-2 border-black" />}
                </div>
                : <Link href={item.link} key={item.index}>
                  <ListItem selected={pathname.includes(item.link)}>
                    <ListItemPrefix>
                      <item.Icon className="h-6 w-6" />
                    </ListItemPrefix>
                    <Typography className="mr-auto tracking-wide">
                      {item.name}
                    </Typography>
                  </ListItem>
                </Link>
            )}
          </List>
        </Card>
      </Drawer>
    </div >

  );
}

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