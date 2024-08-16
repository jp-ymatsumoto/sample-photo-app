"use client";

import { logoutAction } from "@/actions";
import { StrapiAuthContext } from "@/provider/StrapiAuth";
import { useContext } from "react";

export function LogoutButton() {
  const { logout } = useContext(StrapiAuthContext);
  return (
    <form
      action={() => {
        logout();
        logoutAction();
      }}
    >
      <button
        type="submit"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Logout
      </button>
    </form>
  );
}
