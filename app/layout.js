import { Geist, Geist_Mono, Cinzel, Libre_Baskerville } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import CreateProfileOnSignIn from "@/components/AuthClient/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzelBold = Cinzel({
  variable: "--font-cinzel-bold",
  subsets: ["latin"],
  weight: "700",
});

const libreBaskervilleSans = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "HackUSF 2026",
  description:
    "Join HackUSF 2026, the premier hackathon at University of South Florida! Build innovative projects, compete for prizes, network with students and industry professionals. Open to all skill levels. Register now.",
  keywords: [
    "HackUSF",
    "HackUSF 2026",
    "USF hackathon",
    "University of South Florida hackathon",
    "Tampa hackathon",
    "student hackathon",
    "tech competition",
    "coding competition",
    "programming competition",
    "GDG",
    "Google Developer Group",
    "USF GDG",
    "hackathon Tampa",
    "Florida hackathon",
    "college hackathon",
    "university hackathon",
    "tech event USF",
    "student tech event",
    "innovation competition",
    "software development",
  ],
  authors: [{ name: "USF GDG" }],
  creator: "USF GDG",
  publisher: "University of South Florida GDG",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hackusf.com",
    siteName: "HackUSF 2026",
    title: "HackUSF 2026",
    description:
      "Join HackUSF 2026 at the University of South Florida! Compete, build, and innovate. Open to all students. Register now!",
    images: [
      {
        url: "https://hackusf.com/images/2.png",
        width: 1024,
        height: 1024,
        alt: "HackUSF 2026 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackUSF 2026",
    description:
      "Join HackUSF 2026 at University of South Florida! Build projects, compete for prizes, and network with students and professionals.",
    images: ["https://hackusf.com/images/2.png"],
    creator: "@USFGDG",
  },
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/images/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/images/web-app-manifest-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/images/favicon.svg",
  },
  metadataBase: new URL("https://hackusf.com"),
  alternates: {
    canonical: "https://hackusf.com",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${cinzelBold.variable} ${libreBaskervilleSans.variable} antialiased`}
        >
          <CreateProfileOnSignIn />
          <ThemeRegistry>{children}</ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
