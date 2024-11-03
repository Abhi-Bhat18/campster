"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { X, CalendarIcon } from "lucide-react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchForTemplateQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useSearchForContactListQuery } from "@/lib/features/contact-list/contactListApis";

import SearchableDropDown from "./SearchableDropDown";
import { useAppSelector } from "@/lib/hook";
import {
  useCreateACampaignMutation,
  useSendTestEmailMutation,
} from "@/lib/features/campaign/campaignApis";
import { toast } from "sonner";

export const campaignSchema = z.object({
  name: z.string().min(2),
  subject: z.string().min(2),
  mail_from: z.string(),
  template_id: z.string().min(10),
  contact_list_id: z.string().min(10),
  send_later: z.boolean(),
  scheduled_at: z.date().optional(),
});
import { TimePicker12 } from "../ui/time-picker";

interface Props {}

const CampaignForm: React.FC<Props> = () => {
  const mail_from = useAppSelector(
    (state) => state.auth.defaultProject?.default_mail_from
  );

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      subject: "",
      mail_from: mail_from,
      template_id: "",
      contact_list_id: "",
      send_later: false,
    },
  });

  const [createCampaign, { isLoading, error }] = useCreateACampaignMutation();

  const [sendTestEmail, { isLoading: campaignLoading }] =
    useSendTestEmailMutation();

  const router = useRouter();

  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const [sendLater, setSendLater] = useState(false);

  const handleSubmit = async (
    values: z.infer<typeof campaignSchema>,
    status: "draft" | "scheduled"
  ) => {
    try {
      const result = await createCampaign({
        ...values,
        status,
        project_id,
      }).unwrap();

      toast.success("Campaign created successfully");

      router.push(`/campaigns/${result.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleTestEmail = async () => {
    try {
      const values = form.getValues();
      await sendTestEmail({
        ...values,
        project_id,
        emails: emailTags,
      }).unwrap();
      toast.success("Emails sent successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const [email, setEmail] = useState<string>("");
  const [emailTags, setEmailTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const removeEmailTag = (email: string) => {
    setEmailTags((tags) => {
      return tags.filter((tag) => tag != email);
    });
  };
  const handleAddEmail = () => {
    if (email && !emailTags.includes(email)) {
      setEmailTags([...emailTags, email]);
      setEmail("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const isFormFilled = (values: z.infer<typeof campaignSchema>) => {
    const validationResult = campaignSchema.safeParse(values);
    if (validationResult.success) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex space-x-5">
      <div className="basis-7/12 bg-card rounded-md p-5">
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New arrival" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Checkout new arrivals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mail_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail from</FormLabel>
                  <FormControl>
                    <Input placeholder="Name <noreply@domain.com>" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SearchableDropDown
              useSearchQuery={useSearchForTemplateQuery}
              form={form}
              name={"template_id"}
              placeholder="Search for templates"
              formLabel="Email template"
            />
            <SearchableDropDown
              useSearchQuery={useSearchForContactListQuery}
              form={form}
              name={"contact_list_id"}
              placeholder="Search form email list"
              formLabel="Email List"
            />
            <FormField
              control={form.control}
              name="send_later"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg ">
                  <div className="space-y-0.5">
                    <FormLabel className="">Schedule for later</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        console.log("Checked", checked);
                        field.onChange(checked);
                        setSendLater(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {sendLater && (
              <FormField
                control={form.control}
                name="scheduled_at"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel className="text-left">Scheduled At</FormLabel>
                      <FormDescription>
                        Campaigns will run at scheduled time
                      </FormDescription>
                    </div>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePicker12
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            )}
            <div className="flex space-x-5 justify-end">
              <Button
                onClick={() =>
                  form.handleSubmit((values) => handleSubmit(values, "draft"))()
                }
                disabled={isLoading}
                name="draft"
                variant={"secondary"}
                type="button"
              >
                {isLoading ? "Saving" : " Save as draft"}
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  form.handleSubmit((values) =>
                    handleSubmit(values, "scheduled")
                  )()
                }
                name={"scheduled"}
                type="button"
              >
                {isLoading ? "Saving" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="basis-5/12">
        <Card className="border-none p-5 space-y-5">
          <p>Send Test Email</p>

          <Input
            type="email"
            value={email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Add email on "Enter" key press
            placeholder="Enter email and press Enter"
          />
          <p className="text-xs">
            The addresses must belong to existing subscribers.
          </p>
          <div className="flex flex-wrap items-center">
            {emailTags.map((tag, index) => (
              <div
                key={index}
                className="bg-background px-2 py-1 rounded-md flex space-x-2 w-fit m-2"
              >
                <p>{tag}</p>
                <div
                  onClick={() => removeEmailTag(tag)}
                  className="cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <Button
              onClick={handleTestEmail}
              disabled={
                emailTags.length == 0 || !isFormFilled(form.getValues())
              }
            >
              {campaignLoading ? <> Loading</> : <>Send</>}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CampaignForm;
