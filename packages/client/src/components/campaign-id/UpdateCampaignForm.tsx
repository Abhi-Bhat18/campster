"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchForTemplateQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useSearchForContactListQuery } from "@/lib/features/contact-list/contactListApis";

import SearchableDropDown from "@/components/new-campaign/SearchableDropDown";

import { useAppSelector } from "@/lib/hook";
import { useEditACampaignMutation } from "@/lib/features/campaign/campaignApis";

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

interface Props {
  closeDialog: () => void;
}

const UpdateCampaignForm: React.FC<Props> = ({ closeDialog }) => {
  const { campaign } = useAppSelector((state) => state.campaign);

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: campaign?.name,
      subject: campaign?.subject,
      mail_from: campaign?.mail_from,
      template_id: campaign?.template_id,
      contact_list_id: campaign?.contact_list_id,
      send_later: campaign?.send_later,
      scheduled_at: campaign?.scheduled_at
        ? new Date(campaign?.scheduled_at)
        : new Date(),
    },
  });

  const [editCampaign, { isLoading, error }] = useEditACampaignMutation();

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
      const result = await editCampaign({
        ...values,
        status,
        project_id,
        campaign_id: campaign?.id,
      }).unwrap();

      toast.success("Campaign created successfully");
      closeDialog();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const isFormUpdated = (): boolean => {
    const values = form.getValues();
    if (
      campaign?.name != values.name ||
      campaign.subject != values.subject ||
      campaign.mail_from !== values.mail_from ||
      campaign.contact_list_id != values.contact_list_id ||
      campaign.template_id != values.template_id ||
      campaign.send_later != values.send_later ||
      new Date(campaign.scheduled_at) != values.scheduled_at
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex">
      <div className="rounded-md p-5">
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
                    <Input placeholder="Checkout new arrivals" {...field} />
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
              defaultName={campaign?.template_name}
            />
            <SearchableDropDown
              useSearchQuery={useSearchForContactListQuery}
              form={form}
              name={"contact_list_id"}
              placeholder="Search form email list"
              formLabel="Email List"
              defaultName={campaign?.contact_list_name}
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
                      <FormLabel>Schedule At</FormLabel>
                      <FormDescription>
                        Emails will be sent at schduled time
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
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex space-x-5 justify-end">
              <Button
                onClick={() =>
                  form.handleSubmit((values) => handleSubmit(values, "draft"))()
                }
                name="draft"
                variant={"secondary"}
                type="button"
                disabled={!isFormUpdated() || isLoading}
              >
                {!isLoading ? "Save as draft" : "Loading"}
              </Button>
              <Button
                onClick={() =>
                  form.handleSubmit((values) =>
                    handleSubmit(values, "scheduled")
                  )()
                }
                name={"scheduled"}
                type="button"
                disabled={!isFormUpdated() || isLoading}
              >
                {!isLoading ? "Save" : "Updating"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCampaignForm;
