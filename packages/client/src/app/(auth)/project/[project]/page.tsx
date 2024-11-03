"use client";
import React from "react";
import { usePathname } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectOverview from "../../../../components/project/ProjectOverview";
import ProjectAccess from "../../../../components/project/project-access/ProjectAccess";
import { useAppSelector } from "@/lib/hook";

const Project = () => {
  const pathName = usePathname();

  let id = pathName.split("/").at(-1);

  const default_project_id = useAppSelector(
    (state) => state.auth.defaultProject?.project_id
  );

  if (id === "default") {
    id = default_project_id;
  }

  return (
    <Tabs defaultValue="overview" className="p-5 space-y-5">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="access">Project access</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="px-2">
        <ProjectOverview project_id={id!} />
      </TabsContent>
      <TabsContent value="access">
        <ProjectAccess project_id={id!} />
      </TabsContent>
    </Tabs>
  );
};

export default Project;
