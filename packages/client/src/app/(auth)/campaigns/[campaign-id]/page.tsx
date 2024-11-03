import React from "react";
import Details from "../../../../components/campaign-id/Details";
import CampaignEmails from "../../../../components/campaign-id/CampaignEmails";
import CampaignGraphs from "../../../../components/campaign-id/graphs/CampaignGraphs";

const Campaign = () => {
  return (
    <div className="space-y-5 relative">
      <div className="">
        <div className="space-y-5">
          <p className="text-2xl">Campaign Details</p>
          <Details />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-2xl">Analytics</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <CampaignGraphs />
      </div>
      <div>
        <p className="text-2xl">Emails</p>
      </div>
      <div>
        <CampaignEmails />
      </div>
    </div>
  );
};

export default Campaign;
