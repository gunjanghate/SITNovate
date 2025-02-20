import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { PointerWrapper } from "@/components/magicui/pointer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupaHire",
  description: "get hired quickly by SupaHire",
};

export default function RootLayout({  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* <PointerWrapper> */}

        <Navbar />
        {children}
        <div className="footer flex justify-center items-center h-16 text-white pt-5 bg-black">
          <p>© 2025 ~ All Rights Reserved SupaHire</p>
        </div>
          {/* </PointerWrapper> */}

      </body>
    </html>
  );
}
