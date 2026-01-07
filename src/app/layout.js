import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Firayalal Public School | Attain and Excel",
  description: "Firayalal Public School - A Unit of Ajay Munyal Memorial Trust. Affiliated to CBSE, New Delhi. Senior Secondary (10+2) education with excellence.",
  keywords: "Firayalal Public School, CBSE School, Education, School, Senior Secondary",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
