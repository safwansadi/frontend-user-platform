"use client"

import { AuthProvider } from "./contexts";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><main><AuthProvider><Navbar />{children}</AuthProvider></main></body>
    </html>
  );
}
