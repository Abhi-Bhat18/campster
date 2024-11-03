"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useUpdateProfileMutation } from "@/lib/features/user/userApis";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hook";
import { toast } from "sonner";

const profileSchema = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  email: z.string().email(),
  contact: z.string(),
});

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [updateProfile, { isLoading, data }] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      contact: user?.contact ? user.contact : "",
    },
  });

  const [updated, setUpdated] = useState(false);

  const handleSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateProfile(values).unwrap();
      toast.success("Profile updated successfully");
      console.log("Data", data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const formUpdated = () => {
      const values = form.getValues();
      if (
        (values.first_name !== user?.first_name && values.first_name !== "") ||
        values.last_name !== user?.last_name ||
        values.email !== user?.email ||
        (user?.contact && user.contact !== values.contact) ||
        (!user?.contact && values.contact !== "")
      ) {
        return true;
      } else {
        return false;
      }
    };
    setUpdated(formUpdated());
  }, [
    form,
    form.formState,
    user?.contact,
    user?.email,
    user?.first_name,
    user?.last_name,
  ]);

  return (
    <div className="flex w-full bg-card p-5 rounded-md shadow-md">
      <div className="basis-1/4 text-2xl">Profile settings</div>
      <div className="3/4 space-y-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <div className="flex space-x-5">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel> First name </FormLabel>
                      <FormControl>
                        <Input placeholder="Abhishek" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel> Last name </FormLabel>
                      <FormControl>
                        <Input placeholder="Bhat" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel> Email </FormLabel>
                      <FormControl>
                        <Input placeholder="mail@abhishekbhat.com" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel> Contact </FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9113021966" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            {updated ? (
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  Save
                </Button>
              </div>
            ) : (
              <> </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
