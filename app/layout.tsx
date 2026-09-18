import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/_components/header/Header";
import { HeaderShell } from "@/app/_components/header/HeaderShell";
import { Footer } from "@/app/_components/footer/Footer";

export const metadata: Metadata = {
  title: "Get Help - The Ability Center",
  description:
    "Need help? Answer a few quick questions and we'll connect you with the right Ability Center program — assistance dogs, equipment, home access, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <HeaderShell>
          <Header />
        </HeaderShell>
        {children}
        <Footer />
      </body>
    </html>
  );
}
