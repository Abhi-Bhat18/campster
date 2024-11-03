"use client";
import { useGetTransactionalEmailsQuery } from "@/lib/features/apikeys/keysApis";
import React from "react";
import TableLoading from "../loading-screens/TableLoading";
import { DataTable } from "../ui/data-table";
import { transactioinalEmailColumns } from "./transactionalEmailColumns";

const TransactionalEmail = () => {
  const { data, isLoading, isError } =
    useGetTransactionalEmailsQuery(undefined);
  return (
    <div className="space-y-5">
      <p className="text-2xl">Transactional Emails</p>
      {isLoading && <TableLoading columns={6} />}
      {!isLoading && !isError && (
        <DataTable columns={transactioinalEmailColumns} data={data} />
      )}
    </div>
  );
};

export default TransactionalEmail;
