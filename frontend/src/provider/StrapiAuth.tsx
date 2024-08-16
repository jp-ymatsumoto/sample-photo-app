"use client";
import { User } from "@/types";
import { createContext, FC, useEffect, useState } from "react";

const defaultValue = {
  user: null,
  logout: () => {},
};
export const StrapiAuthContext = createContext<{ user: User | null; logout: () => void }>(
  defaultValue
);

type Props = {
  children: React.ReactNode;
};
const StrapiAuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/users/me");
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
      }
    })();
  }, []);

  return (
    <StrapiAuthContext.Provider
      value={{
        user: user,
        logout: () => {
          setUser(null);
        },
      }}
    >
      {children}
    </StrapiAuthContext.Provider>
  );
};

export default StrapiAuthProvider;
