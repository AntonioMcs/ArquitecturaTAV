import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Librería Online - El Lector",
  description: "Bienvenido a la librería online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white font-lexend">
        {children}
      </body>
    </html>
  );
}
