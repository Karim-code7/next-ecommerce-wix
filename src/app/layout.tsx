import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContext, WixContextProvider } from "@/context/WixContext";
import { UIContextProvider } from "@/context/UIContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-100">
          <WixContextProvider>
            <UIContextProvider>
              <Navbar />
              {children}
              <Footer />
            </UIContextProvider>
          </WixContextProvider>
        </div>
      </body>
    </html>
  );
}
