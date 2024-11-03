"use client";
import React from "react";
import { DataTable } from "../../../components/ui/data-table";
import { columns, projectData } from "../../../components/projects/projects-data";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewProjectForm from "../../../components/projects/NewProjectForm";

const Projects = () => {
  return (
    <section className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xl">Your projects</p>
        <Dialog >
          <DialogTrigger>
            <Button className="space-x-2 items-center">
              <span className="">New project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-5 border-secondary">
            <DialogHeader>
              <p className="text-xl">Create new project</p>
            </DialogHeader>
            <NewProjectForm />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={projectData} />
    </section>
  );
};

export default Projects;
