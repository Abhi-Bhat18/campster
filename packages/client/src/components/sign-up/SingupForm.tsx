"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import parseJwt from "@/utils/parseJwt";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/lib/features/auth/authApis";
import { toast } from "sonner";

const singUpSchema = z.object({
  first_name: z
    .string()
    .min(2, "Firstname at least contain 2 characters")
    .max(50, "Firstname can not exeed 50 characters"),
  last_name: z.string().optional(),
  email: z.string().email().max(50),
  password: z.string().min(8, "Password should at least contian 8 characters"),
});

const SingupForm = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof singUpSchema>>({
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const params = useSearchParams();

  const inviteToken = params.get("token");

  if (inviteToken == null || !inviteToken) {
    router.push("./invalid");
    return;
  }

  const decoded = parseJwt(inviteToken);
  form.setValue("email", decoded.email);

  const onSubmit = async (values: z.infer<typeof singUpSchema>) => {
    try {
      console.log("Values", values);
      await signup({
        ...values,
        token: inviteToken,
      }).unwrap();
      toast.success("Signed up successfully");
      router.push("/sign-in");
    } catch (error: any) {
      if (error?.status <= 400 && error?.status < 500) {
        toast.error("Invalid data");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 border-none"
      >
        <div className="flex space-x-5">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="john.snow@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="john.snow@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The email is pre-filled from the invitation link
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*****"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Password should contain minimum 8 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm flex space-x-2 items-center">
          <Checkbox
            checked={showPassword}
            onCheckedChange={() => setShowPassword((prev) => !prev)}
          />{" "}
          <span>Show password</span>
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading ? "Signing Up" : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SingupForm;
