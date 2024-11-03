import React from "react";
import Link from "next/link";
import ResetPasswordForm from "@/components/forgot-password/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <main className="flex h-screen">
      <div className="basis-1/2 flex justify-center items-center">
        some gifs
      </div>
      <div className="basis-1/2 flex justify-center items-center">
        <div className="border border-secondary p-10 rounded-md space-y-5">
          <div className="space-y-2">
            <p className="text-2xl">Forgot Password ? </p>
          </div>
          <ResetPasswordForm />
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

export default ResetPassword;
