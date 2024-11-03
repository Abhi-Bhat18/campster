"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { campaignColumns } from "../../../components/campaigns/campaign-columns";
import Link from "next/link";
import { useGetAllCampaignsQuery } from "@/lib/features/campaign/campaignApis";
import { useAppSelector } from "@/lib/hook";
import isUserAuthorized from "@/utils/permissionCheck";
import { DataTable } from "@/components/ui/data-table";
import TableLoading from "@/components/loading-screens/TableLoading";

const Campaigns = () => {
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );
  const { permissions } = useAppSelector((state) => state.auth);

  const { data, error, isLoading } = useGetAllCampaignsQuery(project_id!);

  return (
    <section className="w-full space-y-5">
      <div className="flex w-full justify-between items-center">
        <p>Campaigns </p>
        {isUserAuthorized(permissions, "campaigns", "create") && (
          <Button variant={"link"}>
            <Link href={"/campaigns/new-campaign"}> New Campaign </Link>
          </Button>
        )}
      </div>
      {isLoading && (
        <div>
          <TableLoading columns={6} />
        </div>
      )}
      {error && <div>Something went wrong</div>}
      {!isLoading && !error && (
        <DataTable columns={campaignColumns} data={data} />
      )}
    </section>
  );
};

export default Campaigns;
