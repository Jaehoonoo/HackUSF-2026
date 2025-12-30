import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
    "Join USF GDSC Hackathon 2026! Innovate and compete in HackUSF at the University of South Florida. Build projects, win prizes, and network.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${cinzelBold.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
