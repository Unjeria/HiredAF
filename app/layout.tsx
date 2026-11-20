import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HiredAF — Your next hire shouldn’t take over your week.",
  description:
    "A clearer hiring workspace for growing teams. Manage roles, candidates, and applications without the spreadsheet scramble.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hiredaf.com"),
  openGraph: {
    title: "HiredAF — Hiring, without the headache.",
    description: "Less chasing. Less guesswork. More time for people.",
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
