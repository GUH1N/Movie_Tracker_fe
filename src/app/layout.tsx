import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
    variable: "--font-exo2",
    subsets: ["latin"],
    weight:['400',  '600', '700', '900'],
    }
);

export const metadata: Metadata = {
  title: "TODO APP!",
  description: "Manage your todos like ever Before!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo2.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
