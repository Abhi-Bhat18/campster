"use client";
import React, { useState } from "react";
import { z } from "zod";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  Form,
  FormItem,
  FormDescription,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useInviteUserToProjectMutation } from "@/lib/features/project/projectApis";
import { toast } from "sonner";

interface Props {
  closeDialog: () => void;
}

const inviteSchema = z.object({
  email: z.string().trim().email({ message: "Email should be valid" }),
  role_id: z.string().trim().nonempty({ message: "Please select a role" }),
});

interface Props {
  closeDialog: () => void;
  project_id: string;
}
const InviteUser: React.FC<Props> = ({ closeDialog, project_id }) => {
  const [inviteUser, { isLoading, isError }] = useInviteUserToProjectMutation();

  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      role_id: "",
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof inviteSchema>) => {
    try {
      await inviteUser({
        ...values,
        project_id,
      }).unwrap();
      toast.success("Invitation sent successfully");
      closeDialog()
    } catch (error: any) {
      if (error.status >= 400 && error.status < 500) {
        toast.error("Invalid data");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Owner</SelectItem>
                  <SelectItem value="2">Admin</SelectItem>
                  <SelectItem value="3">Manager</SelectItem>
                  <SelectItem value="4">User</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage roles and permissions in your{" "}
                <Link href="/roles" className="text-blue-500">
                  Organization settings
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder="john@gmail.com" {...field} />
              </FormControl>

              <FormDescription>
                Invitation will be sent for the project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Button disabled={isLoading}>
            {isLoading ? "Inviting" : "Invite"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InviteUser;
