import { QueryProvider } from "@/components/query-provider";
import { cn } from "@/libs/utils";
import type { Metadata, Viewport } from "next";
import { Dosis, IBM_Plex_Sans_KR, Quicksand } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "개추비추",
  description: "개추비추",
};

const dosis = Dosis({ weight: ["400"], subsets: ["latin"] });

const quicksand = Quicksand({ subsets: ["latin"] });

const IBMPlesSans = IBM_Plex_Sans_KR({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={cn(dosis.className, quicksand.className, IBMPlesSans.className, "h-full max-h-screen overflow-y-hidden bg-white")}>{children}</body>
      </QueryProvider>
    </html>
  );
}
