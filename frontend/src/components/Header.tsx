import Link from "next/link";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="grid grid-cols-3 py-2 border-b-2 bg-slate-100">
      <div className="justify-self-start content-center pl-5">
        {/* ロゴ */}
        <Link href={"/"}>
          <h1>写真シェアアプリ</h1>
        </Link>
      </div>
      <div className="justify-self-center">{/* TODO: ユーザのアイコンと名前 */}</div>
      <div className="justify-self-end pr-5 flex flex-row gap-x-2">
        {/* TODO: ログインやログアウト */}
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
