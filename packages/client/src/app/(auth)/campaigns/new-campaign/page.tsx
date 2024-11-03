"use client";
import React from "react";
import NewCampaignForm from "../../../../components/new-campaign/CampaignForm";

const NewCampaign = () => {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-2xl">New Campaign</p>
      </div>
      <NewCampaignForm />
    </div>
  );
};

export default NewCampaign;
