import React from 'react'
import Link from 'next/link'
import SingupForm from '../../../components/sign-up/SingupForm'
import { itim } from '@/utils/config'

const SignUp = () => {
    return (
      <main className="flex h-screen">
        <div className="basis-1/2 bg-background relative">
          <p className={`${itim.className} text-3xl absolute top-20 left-20`}>
            <Link href={"/"}>Campster</Link>
          </p>
        </div>
        <div className="basis-1/2 flex justify-center items-center">
          <div className="border border-secondary p-10 rounded-md space-y-5">
            <div className="space-y-2">
              <p className="text-2xl text-center">Create an account</p>
            </div>
            <SingupForm />
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
}

export default SignUp