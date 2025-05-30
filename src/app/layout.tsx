import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ClientBody from "./ClientBody";
import LayoutContent from "@/components/LayoutContent";

export const metadata: Metadata = {
  title: "vansion design",
  description: "Home site of vansion design coperatiopn",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody>
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </ClientBody>
    </html>
  );
}
