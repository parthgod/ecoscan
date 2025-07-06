import { ClothesProvider } from "@/context/ClothesContext";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoScan",
  description: "Clothing Carbon Footprint Scanner ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <main className="flex items-center justify-center w-screen h-screen">
          {/* <div
            className="absolute top-0 left-0 w-screen h-screen opacity-70"
            style={{ backgroundImage: "linear-gradient(-180deg, #2b5876 0%, #2c5d2a 100%)" }}
          /> */}
          <NextTopLoader />
          <ClothesProvider>
            <div className="w-full h-full">{children}</div>
          </ClothesProvider>
          <Toaster
            position="top-center"
            richColors
            closeButton={true}
            duration={4000}
          />
        </main>
      </body>
    </html>
  );
}
