import type { Metadata } from "next";
// import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./components/provider";
import Header from "./components/Header";
import ImageKitProvider from "./components/ImageKitProvider";
// import { SomeOtherFont } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Video Upload App",
  description: "Upload and watch videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <ImageKitProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </ImageKitProvider>
        </Providers>
      </body>
    </html>
  );
}
