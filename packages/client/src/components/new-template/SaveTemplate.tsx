"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDocument } from "@/components/email-builder/documents/editor/EditorContext";
import { useRouter } from "next/navigation";

import { renderToStaticMarkup } from "@usewaypoint/email-builder";
import { useCreateNewTemplateMutation } from "@/lib/features/email-template/emailTemplateApis";
import { useAppSelector } from "@/lib/hook";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const templateSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
});

const SaveTemplate = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [createTemplate, { isLoading, isError }] =
    useCreateNewTemplateMutation();

  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
    },
  });

  const document = useDocument();

  const handleSubmit = async (
    values: z.infer<typeof templateSchema>,
    status: string
  ) => {
    try {
      const result = await createTemplate({
        ...values,
        project_id,
        json: document,
        html: renderToStaticMarkup(document, { rootBlockId: "root" }),
        status: status ? status : "ready",
      }).unwrap();
      router.push(`/templates/${result.id}`);
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-between w-full">
      <Form {...form}>
        <form className="w-full flex items-end">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[400px]">
                <FormLabel>Template Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter template name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="space-x-5 w-full flex justify-end items-end">
        <Button
          disabled={isLoading}
          onClick={form.handleSubmit((values) => handleSubmit(values, "draft"))}
          variant={"secondary"}
          type="button"
        >
          {isLoading ? "Saving as draft" : " Save as draft"}
        </Button>
        <Button
          disabled={isLoading}
          onClick={form.handleSubmit((values) => handleSubmit(values, "ready"))}
          type="button"
          variant={"default"}
        >
          {isLoading ? "Saving" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default SaveTemplate;
