import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-5 border-t-2">
      {/* コピーライト */}
      <p>&copy; 2024 写真シェアアプリ</p>
      {/* TODO: プライバシーポリシーのリンク */}
      <Link href="/privacy-policy">プライバシーポリシー</Link>
      {/* TODO: 会社情報のリンク */}
      <Link href="/company-information">会社情報</Link>
    </footer>
  );
};

export default Footer;
