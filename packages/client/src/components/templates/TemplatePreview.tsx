"use client";
import React from "react";
import { useGetAnEmailTemplateQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useAppSelector } from "@/lib/hook";
import { useDocument } from "@/components/email-builder/documents/editor/EditorContext";
import { Reader } from "@usewaypoint/email-builder";

interface Props {
  template_id: string;
}

const TemplatePreview: React.FC<Props> = ({ template_id }) => {
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );
  const document = useDocument();

  const { data, isLoading, isError } = useGetAnEmailTemplateQuery({
    template_id,
    project_id,
  });
  console.log("Data", data);

  if (isLoading) return <> Loading... </>;
  return (
    <div>
      <Reader document={document} rootBlockId="root" />
    </div>
  );
};

export default TemplatePreview;
