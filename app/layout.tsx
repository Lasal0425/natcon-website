import { Poppins, Noticia_Text } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NatCon 2026",
  description: "National Conference 2026",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const noticia = Noticia_Text({
  variable: "--font-noticia",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${noticia.variable} antialiased`}
      >

        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
