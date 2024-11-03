"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCheckLoginQuery } from "@/lib/features/auth/authApis";
import { useAppSelector } from "@/lib/hook";

interface Props {
  children: React.ReactNode;
}

const AuthCheckLayout: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const { error, isLoading } = useCheckLoginQuery(undefined, {
    skip: isLoggedIn,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    router.push("/");
    return null;
  } else if (!isLoggedIn || error) {
    return <>{children}</>;
  }
};

export default AuthCheckLayout;
