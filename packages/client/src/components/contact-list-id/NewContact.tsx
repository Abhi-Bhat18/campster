import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddNewContactMutation } from "@/lib/features/contact-list/contactListApis";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const newContactSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must contain at least 2 characters"),
  last_name: z.string().optional(),
  email: z.string().email(),
  contact: z.string(),
  attributes: z.string(),
});

interface Props { 
  closeDialog : () => void;
}

const NewContact : React.FC<Props> = ( { closeDialog} ) => {

  const form = useForm<z.infer<typeof newContactSchema>>({
    resolver: zodResolver(newContactSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      attributes: "",
    },
  });
  const pathName = usePathname();
  const [addContact, { isLoading }] = useAddNewContactMutation();

  const handleSubmit = async (values: z.infer<typeof newContactSchema>) => {
    try {
      const contact_list_id = pathName.split("/").at(-1);
      const result = await addContact({
        ...values,
        attributes: {},
        contact_list_id,
      }).unwrap();
      closeDialog();
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="mail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="+91 4455667788" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attributes</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-20"
                  placeholder="{ interests : [ 'shoes', 'glasses' ] } "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-5 justify-end items-center">
          <Button disabled={isLoading} type="submit">
              { 
                isLoading ? "Saving" : 'Save'
              }
             </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewContact;
