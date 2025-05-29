import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { cn } from "@/lib/helpers/utils";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
// const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
    // className={cn(
    //   "min-h-screen font-sans antialiased bg-background text-black",
    //   fontSans.variable
    // )}
    >
      < Header />
      <section className="flex w-full">
        <Sidebar />
        <div className="w-full flex justify-center">
          {children}
        </div>
      </section>
    </div >
  );
}
