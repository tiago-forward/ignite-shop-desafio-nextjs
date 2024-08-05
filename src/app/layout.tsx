import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Logo from '../../public/logo.svg'
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "100"
});

export const metadata: Metadata = {
  title: "Home | Ignite Shop",
  description: "Bem-vindo à Ignite Shop, seu destino preferido para produtos incríveis!",
  keywords: ['shop', 'produtos', 'ignite'],
  authors: [{ name: 'Ignite Shop'}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col items-start justify-center min-h-screen">
          <header className="pt-8 pb-8 w-full max-w-6xl m-auto">
            <Image src={Logo} alt={"Ignite shop"} />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
