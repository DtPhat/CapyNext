import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "./ui/navigation/sidebar";
import Drawer from "./ui/navigation/drawer";
import Header from "./ui/navigation/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CapyVenture",
  description: "Website for English self-study",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Providers>
          <Header />
          <section className="flex justify-center bg-white">
            <Sidebar />
            {children}
          </section>
        </Providers>
      </body>
    </html>
  );
}
