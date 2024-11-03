import EmailBuilder from "@/components/email-builder/EmailBuilder";
import React from "react";
import SaveTemplate from "../../../../components/new-template/SaveTemplate";

const NewTemplate = () => {
  return (
    <div className="space-y-5">
      <div className="w-full flex items-center">
        <SaveTemplate />
      </div>
      <EmailBuilder />
    </div>
  );
};

export default NewTemplate;
