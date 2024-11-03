"use client";
import React from "react";
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
import { useForgotPasswordMutation } from "@/lib/features/auth/authApis";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email should be valid"),
});

const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      console.log("Values", values);
      await forgotPassword(values).unwrap();
      form.reset();
      toast.success("Reset password link sent successfully");
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
              <FormLabel>Registered Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Please enter the email address associated with your email. We
                will email a link to reset the password.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full">
          {isLoading ? "Sending" : "Send reset password link"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
