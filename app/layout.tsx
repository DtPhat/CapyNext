import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "@/components/layout/sidebar";
import Drawer from "../components/layout/drawer";
import Header from "@/components/layout/header";
import { cn } from "@/lib/helpers/utils";
import { Toaster } from "@/components/ui/toaster";
// const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "CapyVenture",
  description: "Website for English self-learner",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen font-sans antialiased bg-background text-black",
        fontSans.variable
      )}>
        <Providers>
          {/* <Header />
          <section className="flex w-full">
            <Sidebar />
            <div className="w-full flex justify-center"> */}
              {children}
            {/* </div>
          </section> */}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
