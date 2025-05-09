import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "another design",
  description: "another design clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="p-6">
            <div className="flex justify-between items-center">
              <div className="logo-nav">
                <div className="logo-text">
                  <a href="/" className="hover:opacity-80 transition-opacity">another</a>
                  <span id="random" className="ml-2">design</span>
                </div>
              </div>

              <Navigation />
            </div>
          </header>

          <main className="flex-grow">{children}</main>

          <footer className="fixed-footer">
            <div className="container mx-auto px-6">
              <div className="footerinfo">
                <p className="text-sm">contact us: info@another-lab.com&nbsp;&nbsp;tel: 020-89636400</p>
              </div>
              <div className="footerbeian">
                <a href="https://beian.miit.gov.cn/" target="_blank" className="text-xs text-gray-400" rel="noreferrer">粤ICP备14043463号-1</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
