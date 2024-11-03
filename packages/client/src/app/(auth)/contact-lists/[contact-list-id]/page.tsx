'use client'
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactListDetails from "../../../../components/contact-list-id/ContactListDetails";
import Contacts from "../../../../components/contact-list-id/Contacts";
import ImportData from "../../../../components/contact-list-id/ImportData";

const ContactList = () => {

  return (
    <div>
      <Tabs defaultValue="details" className="space-y-5">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="import-data">Import Data</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-5 w-full">
          <ContactListDetails />
          <Contacts />
        </TabsContent>
        <TabsContent value="import-data">
          <ImportData />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactList;
