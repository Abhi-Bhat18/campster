"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hook";
import { useGetAContactListsQuery } from "@/lib/features/contact-list/contactListApis";
import UpdateContactList from "./UpdateContactList";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import CardLoading from "@/components/loading-screens/CardLoading";

const ContactListDetails = () => {
  const path = usePathname();
  const id = path.split("/").at(-1);
  const [ isOpen , setIsOpen] = useState(false);

  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  const { isLoading, isError } = useGetAContactListsQuery({
    project_id,
    contact_list_id: id,
  });

  const { contactList } = useAppSelector((state) => state.contactList);

  if (isLoading) {
    <div className="w-full">
      <CardLoading rows={7}/>
    </div>;
  } else if (!isLoading && !isError) {
    return (
      <div className="basis-1/2 p-5 bg-card rounded-md relative">
        <div className="absolute right-5">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Pencil className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="border-secondary">
              <DialogHeader>Update Contact list</DialogHeader>
              <UpdateContactList closeDialog={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {contactList && (
          <div className="space-y-5">
            <div className="flex space-x-5">
              <p className="basis-1/3">Name</p> <p>{contactList.name}</p>
            </div>
            <div className="flex space-x-5">
              <p className="basis-1/3">Description</p>{" "}
              <p>{contactList.description}</p>
            </div>
            <div className="flex space-x-5">
              <p className="basis-1/3">Email Type</p>{" "}
              <p>{contactList.email_type}</p>
            </div>
            <div className="flex space-x-5">
              <p className="basis-1/3">Opt In</p>{" "}
              <p>{contactList.email_opt_in}</p>
            </div>
            <div className="flex space-x-5">
              <p className="basis-1/3">Created By</p>{" "}
              <p>{contactList.first_name + " " + contactList.last_name}</p>
            </div>
            <div className="flex space-x-5">
              <p className="basis-1/3"> Last updated at</p>{" "}
              <p>{new Date(contactList.updated_at).toDateString()}</p>
            </div>
            <div className="flex space-x-5">
              <p className="basis-1/3">Created At</p>{" "}
              <p>{new Date(contactList.created_at).toDateString()}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ContactListDetails;
