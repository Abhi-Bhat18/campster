import React from "react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <main className="flex h-screen">
      <div className="basis-1/2 flex justify-center items-center">
        some gifs
      </div>
      <div className="basis-1/2 flex justify-center items-center bg-card">
        <div className="border border-secondary p-10 rounded-md space-y-5">
          <div className="space-y-2">
            <p className="text-2xl">Forgot Password ? </p>
          </div>
          <ForgotPasswordForm />
          <div className="flex items-center text-xs">
            <div className="flex space-x-2">
              <p>Already have an account?</p>
              <Link href={"/sign-in"}>Sign-in here</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
