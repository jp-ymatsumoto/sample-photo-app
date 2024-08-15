import { getUsers } from "@/lib/strapi";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";

const UserListSection = async () => {
  const users = await getUsers();
  // console.log(users);

  if (users === null || users?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center max-w-60 gap-y-1">
      <div className="flex flex-row justify-between items-center w-full text-base">
        <h2 className="font-bold">Users</h2>
      </div>

      <div className="flex flex-col w-full divide-y">
        {users &&
          users.map((user) => (
            <Link
              href={`/users/${user.username}`}
              key={user.username}
              className="hover:bg-slate-100 hover:rounded-md"
            >
              <div className="flex flex-row items-center gap-x-2 py-1" key={user.username}>
                <div className="w-h h-10 rounded-full flex justify-center items-center">
                  <UserCircleIcon size={40} className="fill-white" />
                </div>
                <h3>{user.username}</h3>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserListSection;
