"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useGetCampaignEmailsQuery } from "@/lib/features/email/emailApis";
import { emailColumns, Email } from "./email-columns";
import { DataTable } from "@/components/ui/data-table";
import TableLoading from "../loading-screens/TableLoading";

const CampaignEmails = () => {

  const pathName = usePathname();
  const id = pathName.split("/").at(-1);
  const { isLoading, isError, data } = useGetCampaignEmailsQuery(id);
  const [selectedRows, setSelectedRows] = useState<Email[]>([]);

  return (
    <div>
      { 
      isLoading && <TableLoading columns={4}/>
      }
      {!isLoading && !isError && (
        <DataTable
          data={data}
          columns={emailColumns}
          setSelection={setSelectedRows}
        />
      )}
      {isError && (
        <div
          className="flex items-center justify-center p-5
        "
        >
          Unable to fetch the data
        </div>
      )}
    </div>
  );
};

export default CampaignEmails;
