"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { useGenerateAPIKeyMutation } from "@/lib/features/apikeys/keysApis";

const apiKeySchema = z.object({
  expires_at: z.date().min(new Date()),
});

interface Props {
  closeDialog: () => void;
}
const NewApiKeyForm: React.FC<Props> = ({ closeDialog }) => {
  const form = useForm<z.infer<typeof apiKeySchema>>({
    defaultValues: {},
  });

  const [generateAPIkey, { isLoading }] = useGenerateAPIKeyMutation();

  const handleSubmit = async (values: z.infer<typeof apiKeySchema>) => {
    try {
      await generateAPIkey(values).unwrap();
      toast.success("New API Key Generated successfully");
      closeDialog();
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="expires_at"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div>
                <FormLabel>Expries At</FormLabel>
                <FormDescription>
                  Keys have by default one year of expiry
                </FormDescription>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button disabled={isLoading} className="">
            {isLoading ? "Generating" : "Generate"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewApiKeyForm;
