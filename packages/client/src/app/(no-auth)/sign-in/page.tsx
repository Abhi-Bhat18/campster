"use client";
import React from "react";
import SignInForm from "../../../components/sign-in/SignInForm";
import Link from "next/link";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";

const Signin = () => {
  const { isLoggedIn, permissions } = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (isLoggedIn) {
    const features = Object.keys(permissions);
    if(features[0] == 'analytics') { 
      router.push(`/`)
    }else { 
      router.push(`/${features[0]}`);
    }
    return null;
  }

  return (
    <main className="flex h-screen">
      <div className="basis-1/2 bg-background flex justify-center items-center">
        <Link href={"/"}>Mailman</Link>
      </div>
      <div className="basis-1/2 flex justify-center items-center">
        <div className="shadow-md border-secondary border p-10 rounded-md space-y-5">
          <div className="space-y-2">
            <p className="text-2xl">Login to your account</p>
            <p className="">Welcome back to Mailman</p>
          </div>
          <SignInForm />
          <div className="flex justify-between text-sm">
            <Link href={"/forgot-password"}>Forgot password ?</Link>{" "}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signin;
