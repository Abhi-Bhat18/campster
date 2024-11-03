"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import InviteUser from "./InviteUser";
import { useGetProjectUsersQuery } from "@/lib/features/project/projectApis";
import { DataTable } from "@/components/ui/data-table";
import { ProjectAccessColumns } from "./projectAccess-columns";
import TableLoading from "@/components/loading-screens/TableLoading";

interface Props {
  project_id: string;
}

const ProjectUsers: React.FC<Props> = ({ project_id }) => {
  const { data, isLoading, isError } = useGetProjectUsersQuery(project_id);
  const [selection, setSelection] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-2xl">Users</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <Button className="space-x-1 items-center">
                <span className="">Invite user</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-5 border-secondary">
              <DialogHeader>
                <p className="text-2xl">Invite Users</p>
              </DialogHeader>
              <InviteUser
                closeDialog={() => setIsOpen(false)}
                project_id={project_id}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="">
          {isLoading && <>{<TableLoading columns={4} />}</>}
          {!isLoading && !isError && (
            <DataTable columns={ProjectAccessColumns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectUsers;
