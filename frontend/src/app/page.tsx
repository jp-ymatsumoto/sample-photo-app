import CategoryListSection from "@/components/CategoryListSection";
import UserListSection from "@/components/UserListSection";

export default async function Home() {
  return (
    <div className="flex flex-row">
      {/* 左カラム */}
      <div className="grow">
        <h2 className="text-lg font-bold">最新投稿</h2>
        {/* TODO: 最新の写真を10件表示する */}
        {/* TODO: ページネーションを実装する */}
      </div>

      {/* 右カラム */}
      <div className="flex flex-col gap-y-8 p-2 border-l-2">
        <CategoryListSection />
        <UserListSection />
      </div>
    </div>
  );
}
