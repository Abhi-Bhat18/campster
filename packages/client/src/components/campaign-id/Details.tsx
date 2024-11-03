"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useGetACampaignQuery } from "@/lib/features/campaign/campaignApis";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/lib/hook";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardLoading from "../loading-screens/CardLoading";

import UpdateCampaignForm from "./UpdateCampaignForm";
interface RowProps {
  fieldName: string;
  value: string;
}

const Details = () => {
  const pathName = usePathname();
  const id = pathName.split("/").at(-1);

  const { campaign } = useAppSelector((state) => state.campaign);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, isError } = useGetACampaignQuery({
    campaign_id: id,
  });

  if (isLoading) {
    return (
      <div>
        <CardLoading rows={6} />
      </div>
    );
  } else if (!isLoading && !isError && campaign) {
    return (
      <div className="bg-muted/40 p-5 rounded-md space-y-2 relative">
        <div className="absolute top-5 right-5 cursor-pointer">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
              <Pencil className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent className="border-secondary text-white">
              <DialogHeader>
                <DialogTitle>Edit Campaign</DialogTitle>
                <UpdateCampaignForm closeDialog={() => setIsOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Name</p>
          <p className="basis-2/3"> {campaign.name}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Subject</p>
          <p className="basis-2/3"> {campaign.subject}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Mail from</p>
          <p className="basis-2/3">{campaign.mail_from}</p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Template</p>
          <Link
            className="px-0 hover:underline"
            href={`/templates/${campaign.template_id}`}
          >
            {campaign.template_name}
          </Link>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Status</p>
          <p className="basis-2/3">{campaign.status} </p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Scheduled</p>
          <p className="basis-2/3">
            {new Date(campaign.scheduled_at).toDateString()}{" "}
          </p>
        </div>
        <div className="flex w-full space-x-5">
          <p className="basis-1/3">Created By</p>
          <p className="basis-2/3">
            {campaign.first_name + " " + campaign.last_name}{" "}
          </p>
        </div>
      </div>
    );
  }
};

export default Details;
