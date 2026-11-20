import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HiredAF — Hiring, without the headache.",
  description:
    "Meet the AI recruiting workspace built to help ambitious teams find, connect with, and hire the right people.",
  metadataBase: new URL("https://hiredaf.com"),
  openGraph: {
    title: "HiredAF — Hiring, without the headache.",
    description: "Less busywork. Better people. Faster hires.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
