"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import NewListForm from "../../../components/contact-lists/NewListForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DataTable } from "@/components/ui/data-table";
import { ContactListColumns } from "../../../components/contact-lists/list-column";
import {
  useGetAllContactListsQuery,
  useRemoveListMutation,
} from "@/lib/features/contact-list/contactListApis";
import { useAppSelector } from "@/lib/hook";
import isUserAuthorized from "@/utils/permissionCheck";
import TableLoading from "@/components/loading-screens/TableLoading";
import { Archive } from "lucide-react";
import { Lists } from "@/lib/features/contact-list/contactList.slice";
import { toast } from "sonner";

const EmailLists = () => {
  const { defaultProject, permissions } = useAppSelector((state) => state.auth);
  const { contactLists } = useAppSelector((state) => state.contactList);
  const [selectedRows, setSelectedRows] = useState<Lists[]>([]);

  const [removeLists, { isLoading: removeLoading }] = useRemoveListMutation();
  const { isLoading, isError } = useGetAllContactListsQuery({
    project_id: defaultProject?.project_id,
    page: 0,
    pageLimit: 10,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const handleRemoveLists = async () => {
    try {
      const listIds = selectedRows.map((list) => list.id);
      await removeLists(listIds.join(",")).unwrap();
      toast.success("Contact lists removed successfully");
      setArchiveOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex w-full justify-between items-center border-b border-b-gray-300 pb-2">
        <p className="text-2xl"> Contact Lists</p>
        <div className="flex space-x-5 items-center">
          {selectedRows.length > 0 && (
            <Dialog open={archiveOpen} onOpenChange={setArchiveOpen}>
              <DialogTrigger>
                {isUserAuthorized(permissions, "contact-lists", "create") && (
                  <Archive className="h-4 w-4" />
                )}
              </DialogTrigger>
              <DialogContent className="p-5 border-secondary">
                <DialogTitle>
                  <p className="text-xl"> Are you about archiving the list </p>{" "}
                </DialogTitle>
                <DialogHeader className="flex flex-col space-y-2">
                  <p>
                    Only contact list will be archived and the contacts are not
                    deleted or archived
                  </p>
                  <Button
                    disabled={removeLoading}
                    onClick={() => handleRemoveLists()}
                    className=""
                    variant={"destructive"}
                  >
                    Archive
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              {isUserAuthorized(permissions, "contact-lists", "create") && (
                <Button className="space-x-2 items-center">
                  <span className="">New contact List</span>
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="p-5 border-secondary">
              <DialogTitle>
                <p className="text-xl">Create New Email List</p>{" "}
              </DialogTitle>
              <DialogHeader>
                <NewListForm closeDialog={() => setIsOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        {isLoading && <div>{<TableLoading columns={5} />}</div>}
        {!isLoading && !isError && (
          <DataTable
            columns={ContactListColumns}
            data={contactLists}
            setSelection={setSelectedRows}
          />
        )}
      </div>
    </div>
  );
};

export default EmailLists;
