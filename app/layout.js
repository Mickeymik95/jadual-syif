import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AutoUpdate from "../components/AutoUpdate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#0f172a",
};

export const metadata = {
  title: "Roster & Anggaran Gaji",
  description: "Aplikasi Shift, OT, Elaun dan Anggaran Gaji",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ms"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AutoUpdate />
        {children}
        <script
          data-goatcounter="https://rostergaji.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </body>
    </html>
  );
}