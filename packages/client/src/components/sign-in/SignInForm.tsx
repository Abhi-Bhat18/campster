"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/lib/features/auth/authApis";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
const signInSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      await login(values).unwrap();

      toast.success("Logged in successfully");
      router.push("/");
    } catch (error: any) {
      console.log("Error", error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.snow@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={ showPassword ? 'text' : 'password'} placeholder="*****" {...field} />
              </FormControl>
              <FormDescription> 
                Password should contain atleast 8 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2 items-center text-sm">
          <Checkbox
            checked={showPassword}
            onCheckedChange={() => setShowPassword((prev) => !prev)}
          />{" "}
          <p>Show password</p>
        </div>
        <Button disabled={isLoading} className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
