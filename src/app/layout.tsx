import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hokyeong.dev",
  description: "Hello, I'm a frontend developer Hokyeong",
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
