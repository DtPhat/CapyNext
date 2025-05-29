'use client'
import { useAuth } from "@/providers/auth";
import { DisplayContext } from "@/providers/display";
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  Square2StackIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { usePathname } from 'next/navigation';
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { LoginDialog, PremiumDialog } from "../dialog";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";
import { restrictedRoutes } from "@/lib/constants";

const navigationList = [
  {
    Icon: "/sidebar/home.png",
    name: "Home",
    route: "/home",
    index: 1
  },
  {
    Icon: "/sidebar/video.png",
    name: "Videos",
    route: "/videos",
    index: 3
  },
  {
    Icon: "/sidebar/story.png",
    name: "Stories",
    route: "/stories",
    index: 2
  },
  // {
  //   Icon: "/sidebar/user.png",
  //   name: "Conmpanions",
  //   route: "/companies",
  //   index: 2.5
  // },
  {
    Icon: "/sidebar/game.png",
    name: "Games",
    route: "/game",
    index: 4,
    subPages: [
      {
        Icon: Square2StackIcon,
        name: "Flashcard",
        route: "/game/flashcard",
        index: 4.1,
        color: 'text-blue-500'
      },
      {
        Icon: RectangleGroupIcon,
        name: "Matching",
        route: "/game/matching",
        index: 4.2,
        color: 'text-green-500'

      },
      {
        Icon: QuestionMarkCircleIcon,
        name: "Word Guessing",
        route: "/game/word-guessing",
        index: 4.3,
        color: 'text-pink-500'
      },
      {
        Icon: Squares2X2Icon,
        name: "Multiple Choice",
        route: "/game/multiple-choice",
        index: 4.4,
        color: 'text-orange-500'
      },
    ],
  },

  //personal navigation
  {
    Icon: "/sidebar/collection.png",
    name: "My Collections",
    route: "/collections",
    index: 5
  },
  // {
  //   Icon: "WalletIcon",
  //   name: "Saved Lessons",
  //   route: "/save",
  //   index: 6
  // },
]
export default function Sidebar() {
  const [open, setOpen] = useState(1);
  const { userInfo, googleAuthenticate } = useAuth()
  const [openLogin, setOpenLogin] = useState(false)
  const [openPremium, setOpenPremium] = useState(false)
  const handleOpen = (value: number) => {
    // setOpen(open === value ? 0 : value);
    setOpen(open === value ? 0 : value);
  };

  const { setOpenSidebar } = useContext(DisplayContext)
  const pathname = usePathname()
  const router = useRouter()

  const { openSidebar } = useContext(DisplayContext)

  const dismiss: DismissType = {
    outsidePress: false
  }
  const handleOpenLogin = () => {
    setOpenLogin(prev => !prev)
  }
  const handleOpenPremium = () => {
    setOpenPremium(prev => !prev)
  }

  const requringAuthenticationRoutes = restrictedRoutes.authentication
  const requringPremiumRoutes = restrictedRoutes.premium


  const handleAccess = (e: SyntheticEvent, route: string) => {
    if (!userInfo && requringAuthenticationRoutes.includes(route)) {
      handleOpenLogin()
      return
    }
    if (!userInfo?.isPremium && requringPremiumRoutes.includes(route)) {
      handleOpenPremium()
      return
    }
    router.push(route)
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
                          <img className="size-6" src={item.Icon} />
                        </ListItemPrefix>
                        <Typography className="mr-auto tracking-wide text-black">
                          {item.name}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="p-1 text-black flex flex-col gap-1 pl-1.5" >
                      {item.subPages.map(subItem =>
                        <div key={subItem.index} onClick={(e) => handleAccess(e, subItem.route)} className="relative ml-1 border-l-2 hover:border-none">
                          <ListItem selected={pathname.includes(subItem.route)}>
                            <ListItemPrefix>
                              <subItem.Icon className={`size-6 ${subItem.color} ${requringPremiumRoutes.includes(subItem.route) ? 'text-yellow-900' : ''}`} />
                            </ListItemPrefix>
                            <Typography>
                              {subItem.name}
                            </Typography>
                            {requringPremiumRoutes.includes(subItem.route) && < div className="ml-1 absolute left-6 top-1">
                              <Crown className="size-5 rotate-45 text-yellow-700" />
                            </div>}
                          </ListItem>
                        </div>
                      )}
                    </AccordionBody>
                  </Accordion >
                  {/* {item.route === '/game' && <hr className="my-2 border-black" />} */}
                </div>
                : <div onClick={(e) => handleAccess(e, item.route)} key={item.name}>
                  <ListItem selected={pathname.includes(item.route)}>
                    <ListItemPrefix>
                      <img className="size-6" src={item.Icon} />
                    </ListItemPrefix>
                    <Typography className="mr-auto tracking-wide">
                      {item.name}
                    </Typography>
                  </ListItem>
                </div>
            )
            }
          </List >
        </Card >
      </Drawer >
      <LoginDialog
        open={openLogin}
        handleOpen={handleOpenLogin}
        onConfirm={googleAuthenticate}
      />
      <PremiumDialog
        open={openPremium}
        handleOpen={handleOpenPremium}
      />
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