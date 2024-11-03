"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewListMutation } from "@/lib/features/contact-list/contactListApis";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hook";

const emailListSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters").max(50),
  description: z
    .string()
    .min(4, "Description must contain at least 4 characters")
    .max(500),
  email_type: z.string(),
  email_opt_in: z.string(),
});

interface Props { 
  closeDialog : () => void;
}

const NewListForm : React.FC<Props> = ( { closeDialog} ) => {


  const form = useForm<z.infer<typeof emailListSchema>>({
    resolver: zodResolver(emailListSchema),
    defaultValues: {
      name: "",
      description: "",
      email_type: "private",
      email_opt_in: "single",
    },
  });
  const project_id = useAppSelector( state => state.auth.defaultProject?.project_id )
  const router = useRouter();

  const [createList, { data, isLoading }] = useCreateNewListMutation();

  const onSubmit = async (values: z.infer<typeof emailListSchema>) => {
    try {
      const result = await createList({
        ...values,
        project_id: project_id,
      }).unwrap();
      closeDialog();
      toast.success("List created successfully");
      router.push(`/contact-lists/${result.id}`);
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
          <Button type="button" variant={"secondary"}>
            {" "}
            Cancel{" "}
          </Button>
          <Button disabled={isLoading} type="submit"> { !isLoading ? "Create" : "Creating" } </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewListForm;
