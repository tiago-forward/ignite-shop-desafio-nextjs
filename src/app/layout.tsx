/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Logo from '../../public/logo.svg'
import Handbag from '../../public/handbag.svg'

import Link from "next/link";
import Image from "next/image";

import Cart from "./components/cart";
import { Button } from "@radix-ui/themes";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "100"
});

export const metadata: Metadata = {
  title: "Home | Ignite Shop",
  description: "Bem-vindo à Ignite Shop, seu destino preferido para produtos incríveis!",
  keywords: ['shop', 'produtos', 'ignite'],
  authors: [{ name: 'Ignite Shop' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col items-start min-h-screen relative">
          <header className="pt-8 pb-8 w-full max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/">
              <Image src={Logo} alt={"Ignite shop"} />
            </Link>
            <div className="">
              <Cart />
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
