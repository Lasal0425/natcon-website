import { Poppins, Noticia_Text } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

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
