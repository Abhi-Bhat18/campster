import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import APIKeys from "@/components/transactionals/APIKeys";
import TransactionalEmail from "@/components/transactionals/TransactionalEmail";

const Transactional = () => {
  return (
    <div>
      <Tabs defaultValue="emails" className="space-y-5">
        <TabsList>
          <TabsTrigger value="emails">Transactional Emails</TabsTrigger>
          <TabsTrigger value="api-keys">API-Keys</TabsTrigger>
        </TabsList>
        <TabsContent value="emails" className="px-2">
          <TransactionalEmail />
      </TabsContent>
        <TabsContent value="api-keys">
          <APIKeys />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactional;
