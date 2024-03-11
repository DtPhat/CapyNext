'use client'
import React, { useContext } from "react";
import {
  Navbar,
  // MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Abril_Fatface } from "next/font/google";
import { LayoutContext } from "../../providers";
const abrilFatface = Abril_Fatface({ weight: "400", subsets: ["latin"] });

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const { setOpenSidebar } = useContext(LayoutContext)


  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="mb-14">
      <Navbar className="fixed top-0 z-50 max-h-20 max-w-full rounded-none py-2 px-5 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button onClick={() => setOpenSidebar(opening => !opening)}>
              <Bars3Icon className="h-10 w-10 stroke-2 hover:bg-brown-primary/10 rounded-3xl p-1 text-black" />
            </button>
            <Link href='/' className="flex items-center justify-between">
              <img src="/icon.png" alt="brand" className="w-9 h-9" />
              <span className={`${abrilFatface.className} text-2xl text-brown-primary`}>Capy</span>
              <span className={`${abrilFatface.className} text-2xl text-primary`}>Venture</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="mr-4 hidden lg:block">{navList}</div> */}
            <div className="flex items-center gap-x-2">
              <Button
                variant="text"
                className="hidden lg:inline-block px-8"
              >
                <span>Sign up</span>
              </Button>
              <Button
                className="hidden lg:inline-block bg-primary px-8"
              >
                Login
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        {/* <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="">
          <span>Sign Up</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="bg-primary">
          <span>Login</span>
          </Button>
          </div>
        </MobileNav> */}
      </Navbar>
    </div>
  );
}