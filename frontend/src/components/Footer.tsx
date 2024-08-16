import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-y-1 py-5 border-t-2">
      {/* プライバシーポリシーと会社情報 */}
      <div className="flex flex-row justify-center items-center gap-x-5 text-base">
        <Link href="/privacy-policy">プライバシーポリシー</Link>
        <Link href="/company-information">会社情報</Link>
      </div>
      {/* コピーライト */}
      <div className="flex justify-center items-center text-base">
        <p className="text-base">&copy; 2024 写真シェアアプリ</p>
      </div>
    </footer>
  );
};

export default Footer;
