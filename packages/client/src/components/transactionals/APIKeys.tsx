"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import NewApiKeyForm from "./NewApiKeyForm";
import {
  useGetAPIKeysQuery,
} from "@/lib/features/apikeys/keysApis";
import TableLoading from "../loading-screens/TableLoading";
import { DataTable } from "../ui/data-table";
import { apiKeyColumns } from "./apiKeyColumns";
import { APIKey } from "./apiKeyColumns";
import { Trash } from "lucide-react";
import InvokeAPIKey from "./InvokeAPIKey";
import { useAppSelector } from "@/lib/hook";

const APIKeys = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openInvokeAPIKey, setOpenInvokeAPIKey] = useState(false);

  const { APIKeys } = useAppSelector( state => state.apiKey );

  const [selectedRows, setSelectedRows] = useState<APIKey[]>([]);

  const { isLoading, isError } = useGetAPIKeysQuery({});

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between space-y-5">
        <p className="text-2xl">API Keys</p>
        <div className="flex items-center space-x-5">
          {selectedRows.length > 0 && (
            <Dialog open={openInvokeAPIKey} onOpenChange={setOpenInvokeAPIKey}>
              <DialogTrigger>
                <Trash className="h-5 w-5" />
              </DialogTrigger>
              <DialogContent className="border-secondary">
                <DialogHeader className="text-xl">Invoke API Key</DialogHeader>
                <InvokeAPIKey closeDialog={() => setOpenInvokeAPIKey(false) } selectedRows={selectedRows}/>
              </DialogContent>
            </Dialog>
          )}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <Button>New API Key</Button>
            </DialogTrigger>
            <DialogContent className="border-secondary">
              <DialogHeader>Generate New API Key</DialogHeader>
              <NewApiKeyForm closeDialog={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        {isLoading && (
          <>
            <TableLoading columns={5} />
          </>
        )}
        {!isLoading && !isError && (
          <DataTable
            data={APIKeys}
            columns={apiKeyColumns}
            setSelection={setSelectedRows}
          />
        )}
      </div>
    </div>
  );
};

export default APIKeys;
