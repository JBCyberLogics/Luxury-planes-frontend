import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUREL — Private Aviation, Considered",
  description:
    "Private aircraft charter shaped around your time, your destination and the way you choose to travel.",
  applicationName: "AUREL Private Aviation",
  openGraph: {
    title: "AUREL — Private Aviation, Considered",
    description:
      "A more considered way to travel. Explore the AUREL approach to private aviation.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111b20",
  width: "device-width",
  initialScale: 1,
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
