import React from "react";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const projectSchema = z.object({
  name: z
    .string()
    .min(2, "At least 2 characters are required")
    .max(255, "Characters can not be exceeded morethan 255"),
  description: z
    .string()
    .max(500, "Maximum 500 Characters are allowed")
    .min(4, "Atleast 4 characters required"),
});

const NewProjectForm = () => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });
  const handleFormSubmit = async (values: z.infer<typeof projectSchema>) => {
    console.log("Values", values);
    try {
      toast("Project created successfully");
    } catch (error) {

    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5 border-none"
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
          <Button variant={"secondary"}>Cancel</Button>
          <Button className="" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewProjectForm;
