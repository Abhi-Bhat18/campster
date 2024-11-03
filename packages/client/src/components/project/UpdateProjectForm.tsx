"use client";
import React from "react";
import { useAppSelector } from "@/lib/hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useUpdateProjectMutation } from "@/lib/features/project/projectApis";

const projectSchema = z.object({
  name: z
    .string()
    .min(2, "At least 2 characters are required")
    .max(255, "Characters can not be exceeded morethan 255"),
  description: z
    .string()
    .max(500, "Maximum 500 Characters are allowed")
    .min(4, "Atleast 4 characters required"),
  default_mail_from: z.string(),
});

interface Props {
  project_id: string;
  closeDialog: () => void;
}

const UpdateProjectForm: React.FC<Props> = ({ project_id, closeDialog }) => {
  const { project } = useAppSelector((state) => state.project);

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name,
      description: project?.description,
      default_mail_from: project?.default_mail_from,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      console.log("Values", values);
      await updateProject({ ...values, project_id }).unwrap();
      toast.success("Project Updated successfully");
      closeDialog();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Project Name </FormLabel>
              <FormControl>
                <Input placeholder="Mailman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="default_mail_from"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Default Mail From </FormLabel>
              <FormControl>
                <Input placeholder="Name <noreply@domain.com" {...field} />
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
              <FormLabel>Project Description </FormLabel>
              <FormControl>
                <Textarea
                  className="h-40 resize-none"
                  placeholder="Open source E mail and Digital marketing tool"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-5">
          <Button disabled={isLoading} className="" type="submit">
            {isLoading ? "Updating" : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProjectForm;
