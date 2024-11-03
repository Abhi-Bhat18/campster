"use client";
import { useAppSelector } from "@/lib/hook";
import React from "react";
import ViewsChart from "./ViewsChart";
import { CampaignBarChart } from "./BarChart";

const CampaignGraphs = () => {
  const { campaign } = useAppSelector((state) => state.campaign);

  if (campaign?.status == "completed") {
    return (
      <>
        <ViewsChart />
        <CampaignBarChart />
      </>
    );
  } else {
    return <p> No analytics </p>;
  }
};

export default CampaignGraphs;
