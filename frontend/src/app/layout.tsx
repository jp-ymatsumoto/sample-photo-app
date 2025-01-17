import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import StrapiAuthProvider from "@/provider/StrapiAuth";

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
        <StrapiAuthProvider>
          <div className="flex flex-col">
            <Header />
            <div className="flex flex-row min-h-screen">
              <Sidebar />
              <div className="grow">{children}</div>
            </div>
            <Footer />
          </div>
        </StrapiAuthProvider>
      </body>
    </html>
  );
}
