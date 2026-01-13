import { Geist, Geist_Mono, Cinzel } from "next/font/google";
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

export const metadata = {
  title: "HackUSF 2026",
  description:
    "Join USF GDG Hackathon 2026! Innovate and compete in HackUSF at the University of South Florida. Build projects, win prizes, and network.",
  icons: {
    icon: "/gdsclogo.webp",
    shortcut: "/gdsclogo.webp",
    apple: "/gdsclogo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${cinzelBold.variable} antialiased`}
        >
          <CreateProfileOnSignIn />
          <ThemeRegistry>{children}</ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
