import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MealCraft — Coach Nutrition Intelligent",
  description:
    "Plans repas personnalisés et paniers de courses adaptés à tes objectifs. Propulsé par IA.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "MealCraft — Coach Nutrition Intelligent",
    description:
      "Plans repas personnalisés et paniers de courses adaptés à tes objectifs.",
    images: [{ url: "/logo.png", width: 1200, height: 340 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dmSans.variable}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
