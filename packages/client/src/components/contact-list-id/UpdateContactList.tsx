"use client";
import React, { useState } from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateContactListMutation } from "@/lib/features/contact-list/contactListApis";

const emailListSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50)
    .trim(),
  description: z
    .string()
    .min(4, "Description must contain at least 4 characters")
    .max(500)
    .trim(),
  email_type: z.string(),
  email_opt_in: z.string(),
});

import { DialogCloseProps } from "@radix-ui/react-dialog";
import { useAppSelector } from "@/lib/hook";

interface Props {
  closeDialog : () => void
}

const UpdateContactList: React.FC<Props> = ({ closeDialog }) => {
  const { contactList } = useAppSelector((state) => state.contactList);
  const pathName = usePathname();
  const id = pathName.split("/").at(-1);

  const form = useForm<z.infer<typeof emailListSchema>>({
    resolver: zodResolver(emailListSchema),
    defaultValues: {
      name: contactList?.name || "",
      description: contactList?.description || "",
      email_type: contactList?.email_type || "private",
      email_opt_in: contactList?.email_opt_in || "single",
    },
  });

  const formAltered = (values: z.infer<typeof emailListSchema>): boolean => {
    if (
      values.name !== contactList?.name ||
      values.description !== contactList.description ||
      values.email_opt_in !== contactList.email_opt_in ||
      values.email_type !== contactList.email_type
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [updateList, { isLoading, isError }] = useUpdateContactListMutation();

  const onSubmit = async (values: z.infer<typeof emailListSchema>) => {
    try {
      await updateList({
        body : values,
        id,
      }).unwrap();
      closeDialog();
      toast.success("List updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Name </FormLabel>
              <FormControl>
                <Input type="text" placeholder="List name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Description </FormLabel>
              <FormControl>
                <Textarea className="h-[200px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Email Type </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Public list can be joined by anyone
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email_opt_in"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Email Opt In </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
                <FormDescription>
                  Requires user confirmation before send campaign mails
                </FormDescription>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-5 justify-end items-center">
          <Button disabled={!formAltered(form.getValues())} type="submit">
            {" "}
            Update{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateContactList;
