"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUpdatePasswordMutation } from "@/lib/features/user/userApis";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: "Current password must be at least 8 characters" }),
    new_password: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" }),
    confirm_password: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"], // Specify where the error should appear
  });

const Password = () => {
  const [updatePassowrd, { isLoading, isError }] = useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      await updatePassowrd(values).unwrap();
      toast.success("password updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-5 flex bg-card rounded-md shadow-md">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="text-xl">Update Password</p>
          </AccordionTrigger>
          <AccordionContent className="flex">
            <div className="basis-1/4">
            </div>
            <div className="basis-3/4">
              <Form {...form}>
                <form
                  className="space-y-5 max-w-96"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="current_password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel> Current Password </FormLabel>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="*****"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel> New Password </FormLabel>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel> Confirm Password </FormLabel>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="******"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  {
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword((prev) => !prev)}
                      />
                      <p>Show password</p>
                    </div>
                  }
                  <div>
                    <Button disabled={isLoading}>
                      {isLoading ? "Updaging" : "Update"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Password;
