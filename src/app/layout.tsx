import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/provider";
import { Inter } from "next/font/google";
import { topics } from "@/config/topics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolvedThis",
  description: "A modern discussion platform app built with Next.js",
  openGraph: {
    title: "SolvedThis",
    description: "A modern discussion platform app built with Next.js",
    type: "website",
    siteName: "SolvedThis",
    url: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    images: ["/home.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  keywords: [
    "nextjs",
    "react",
    "discussion",
    "react server component",
    "solvedthis",
    ...topics.map((topic) => topic.name),
  ],
  twitter: {
    card: "summary_large_image",
    title: "SolvedThis",
    description: "A modern discussion platform app built with Next.js",
    images: [new URL(process.env.NEXT_PUBLIC_APP_URL! + "/og-image.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
