"use client";
import React from "react";
import { useAppSelector } from "@/lib/hook";

const Permissions = () => {
  const { user, defaultProject } = useAppSelector((state) => state.auth);

  const permissions = defaultProject?.project_permissions?.map((permission) => {
    return permission.split(":");
  });

  console.log("Permissions", permissions);
  return (
    <div className="p-5 flex bg-card rounded-md shadow-md">
      <div className="text-2xl basis-1/4">
        <p>Permissions</p>
      </div>
      <div className="basis-3/4 text-lg">
        <div className="flex space-x-5 items-center">
          <p className="basis-1/4">Role</p>
          <p>{user?.role}</p>
        </div>
        {permissions?.map((permission: Array<string>, index) => (
          <div key={index} className="flex space-x-5 text-sm w-full">
            <p className="basis-1/4">{permission[0]}</p>
            <p>{permission[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Permissions;
