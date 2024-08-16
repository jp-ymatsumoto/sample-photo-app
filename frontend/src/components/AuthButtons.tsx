"use client";
import { useContext } from "react";
import LoginButton from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { StrapiAuthContext } from "@/provider/StrapiAuth";

const AuthButtons = () => {
  const { user } = useContext(StrapiAuthContext);
  return <>{user ? <LogoutButton /> : <LoginButton />}</>;
};

export default AuthButtons;
