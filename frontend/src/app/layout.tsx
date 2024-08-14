import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "写真シェアアプリ",
  description:
    "写真シェアアプリで、あなたの日常の瞬間を簡単に共有しよう。写真を撮って、友達や家族とすぐにシェア。シンプルで使いやすいインターフェースで、思い出をもっと楽しく保存しよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <div className="flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
