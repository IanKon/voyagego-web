import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoyageGo — Travel Search",
  description: "Compare flights, trains, buses, hotels, tours and car rental worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
