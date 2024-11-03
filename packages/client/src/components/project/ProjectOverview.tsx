"use client";
import React, { useState } from "react";
import { useGetAProjectQuery } from "@/lib/features/project/projectApis";
import UpdateProjectForm from "./UpdateProjectForm";

import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { useAppSelector } from "@/lib/hook";
import isUserAuthorized from "@/utils/permissionCheck";
import CardLoading from "../loading-screens/CardLoading";

interface Props {
  project_id: string;
}

const ProjectOverview: React.FC<Props> = ({ project_id }) => {
  const { project } = useAppSelector( state => state.project )
  const {  isError, isLoading } = useGetAProjectQuery(project_id);
  const { permissions } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-10">
      <h2 className="text-2xl">Overview</h2>
      {isLoading && (
        <>
          <CardLoading rows={7} />
        </>
      )}
      {!isLoading && !isError && (
        <div className="p-2 rounded-md relative border-secondary bg-card">
          <div className="absolute right-5 top-5">
            {isUserAuthorized(permissions, "project", "update") && (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild className="cursor-pointer">
                  <Pencil className="h-4 w-4" />
                </DialogTrigger>
                <DialogContent className="border-secondary">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <UpdateProjectForm
                      project_id={project_id}
                      closeDialog={() => setIsOpen(false)}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Name</p>
              <p className="basis-3/5">{project?.name}</p>
            </div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Description</p>
              <p className="basis-3/5">{project?.description}</p>
            </div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Status</p>
              <p className="basis-3/5">{project?.status}</p>
            </div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Default Mail from</p>
              <p className="basis-3/5">{project?.default_mail_from}</p>
            </div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Created By</p>
              <p className="basis-3/5">
                {project?.first_name} {project?.last_name}{" "}
              </p>
            </div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Updated at</p>
              <p className="basis-3/5">
                {new Date(project?.updated_at).toDateString()}
              </p>
            </div>
            <div className="flex w-full p-2">
              <p className="basis-2/5">Created at</p>
              <p className="basis-3/5">
                {new Date(project?.created_at).toDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
