import type { Metadata } from "next";
import { Poppins, Tangerine } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Huerstory - Event Content Creator",
  description: "You Live The Moment, We Capture The Story.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${tangerine.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-navy">{children}</body>
    </html>
  );
}
