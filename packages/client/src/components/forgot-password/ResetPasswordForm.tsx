"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForgotPasswordMutation, useResetPasswordMutation } from "@/lib/features/auth/authApis";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeToken } from "@/utils/parseJwt";
import { JwtPayload } from "jwt-decode";
interface ExtendedJwtPayload { 
    email : string,
    id : string
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Email should be valid"),
  password: z
    .string()
    .length(8, { message: "Password should contain atleast 8 characters" }),
  confirm_password: z
    .string()
    .length(8, { message: "Password should contain atleast 8 characters" }),
});



const ResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const params = useSearchParams();
  const token = params.get('token');

  const router = useRouter();

  if (!token || token == null) {
    toast.error("Unable to find the reset password link");
  }

  let decodedToken = decodeToken(token as string) as ExtendedJwtPayload;

const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: decodedToken.email ? decodedToken.email : '',
      password: "",
      confirm_password: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      await resetPassword({ ...values , token : token }).unwrap();
      form.reset();
      toast.success("Password updated successfully");
      router.push("/sign-in")
    } catch (error) {
      form.reset();
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 border-none max-w-96"
      >
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
                Email is pre-filled from the reset password link
              </FormDescription>
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
                <Input type={showPassword ? "text" : "password"} {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                password should contain atleast 8 characters
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type={showPassword ? "text" : "password"} {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>confirm password shoult match</FormDescription>
            </FormItem>
          )}
        />
        <div className="flex space-x-2 items-center">
             <Checkbox
          checked={showPassword}
          onCheckedChange={() => setShowPassword((prev) => !prev)}
        />
        <p>Show password</p>
        </div>

        <Button disabled={isLoading} className="w-full">
          {isLoading ? "Sending" : "Send reset password link"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
