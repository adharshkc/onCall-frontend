import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./global.css";
import "../../styles/bootstrap.min.css";
import "../../styles/custom.css";
import "../../styles/animate.css";
import "../../styles/mega-menu.css";
import "../../styles/nav-alignment-fix.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import ScrollAnimator from "@/components/utils/ScrollAnimator";


const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "On Call - Senior Care & Elderly Nursing",
  description: "Delivering compassionate, memorable care in the comfort of your own home — because your home is your life.",
  keywords: "senior care, elderly nursing, home care, assisted living, memory care, dementia care",
  authors: [{ name: "On Call" }],
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${plusJakarta.variable} antialiased`}>
        <Preloader />
  <ScrollAnimator />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}