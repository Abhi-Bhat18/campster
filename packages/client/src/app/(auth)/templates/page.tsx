"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { templateColumns } from "../../../components/templates/templates-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetEmailTemplatesQuery } from "@/lib/features/email-template/emailTemplateApis";
import { useAppSelector } from "@/lib/hook";
import isUserAuthorized from "@/utils/permissionCheck";
import TableLoading from "@/components/loading-screens/TableLoading";
import { Template } from "@/lib/features/email-template/emailTemplateSlice";
import { Archive } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { useArchiveTemplatesMutation } from "@/lib/features/email-template/emailTemplateApis";
import { toast } from "sonner";

const Templates = () => {
  const project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );
  
  const { templates  } = useAppSelector(state => state.template )

  const [ selectedRows, setSelectedRows] = useState<Template[]>([]);

  const { permissions } = useAppSelector((state) => state.auth);

  const { isError, isLoading } = useGetEmailTemplatesQuery({
    project_id,
    page: 1,
    page_limit: 10,
  });
  const [  archiveTemplate, { isLoading : removeLoading }  ] = useArchiveTemplatesMutation();

  const [ archiveOpen , setArchiveOpen ] = useState(false);

  const handleArchiveTemplate = async () => { 
    try {
    await archiveTemplate(selectedRows).unwrap()
    toast.success("Templates archived successfully");
    setArchiveOpen(false)
    } catch (error) {
    toast.error("Something went wrong");
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-2xl">Templates</p>
       <div className="flex space-x-5 items-center">
        <div>
        {
           selectedRows.length > 0 &&  
          <div>
             <Dialog  open={archiveOpen} onOpenChange={setArchiveOpen}>
              <DialogTrigger className="flex items-center">
                {isUserAuthorized(permissions, "contact-lists", "create") && (
                  <Archive className="h-4 w-4" />
                )}
              </DialogTrigger>
              <DialogContent className="p-5 border-secondary">
                <DialogTitle>
                  <p className="text-xl"> Are you about archiving the templates </p>{" "}
                </DialogTitle>
                <DialogHeader className="flex flex-col space-y-2">
                  <p>
                    Scheduled campaigns will still use the template and marked as archived
                  </p>
                  <Button
                    disabled={removeLoading}
                    onClick={() => handleArchiveTemplate()}
                    className=""
                    variant={"destructive"}
                  >
                    Archive
                  </Button>
                </DialogHeader>
              </DialogContent>
          </Dialog>
          </div>
        }
        </div>
          {isUserAuthorized(permissions, "templates", "create") && (
          <Link href={"/templates/new-template"}>New Template</Link>
        )}
       </div>
      </div>
      {isLoading && <div>{<TableLoading columns={6} />}</div>}
      {!isLoading && !isError && (
        <DataTable columns={templateColumns} data={templates} setSelection={setSelectedRows}/>
      )}
    </section>
  );
};

export default Templates;
