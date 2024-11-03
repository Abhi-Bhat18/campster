"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useGetContactsQuery } from "@/lib/features/contact-list/contactListApis";
import { useAppSelector } from "@/lib/hook";
import { DataTable } from "@/components/ui/data-table";
import { contactsColumn, ContactType } from "./contacts-column";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRemoveContactsMutation } from "@/lib/features/contact-list/contactListApis";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import NewContact from "./NewContact";
import { toast } from "sonner";

import TableLoading from "../loading-screens/TableLoading";

const Contacts = () => {
  const pathName = usePathname();
  const contact_list_id = pathName.split("/").at(-1);

  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );
  const { contacts } = useAppSelector((state) => state.contactList);

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useGetContactsQuery({
    project_id,
    contact_list_id,
  });

  const [selectedRows, setSelectedRows] = useState<ContactType[]>([]);
  const [removeContacts, { isLoading: removeContactLoading }] =
    useRemoveContactsMutation();

  const handleRemoveClick = async () => {
    try {
      const contactIds = selectedRows.map((row) => row.contact_id);
      await removeContacts({
        contact_ids: contactIds,
        contact_list_id,
      }).unwrap();
      toast.success("Contacts removed successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Contacts</p>
        <div className="flex items-center space-x-5">
          {selectedRows.length > 0 && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <div>
                  <Trash className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="border-secondary">
                <DialogTitle>
                  <p className="text-xl">
                    Are sure about removing these contacts from the list ?{" "}
                  </p>
                </DialogTitle>
                <DialogHeader>
                  <div className="flex justify-end">
                    <Button onClick={handleRemoveClick} className="w-fit">
                      Remove
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <Button> Add contact </Button>
            </DialogTrigger>
            <DialogContent className="border-secondary">
              <DialogTitle>
                <p className="text-2xl">Add new contact</p>
              </DialogTitle>
              <DialogHeader>
                <NewContact closeDialog={() => setIsOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        {isLoading && <div>{<TableLoading columns={6} />}</div>}
        {!isLoading && !error && (
          <DataTable
            data={contacts}
            columns={contactsColumn}
            setSelection={setSelectedRows}
          />
        )}
      </div>
    </div>
  );
};

export default Contacts;
