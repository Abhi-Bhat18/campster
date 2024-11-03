'use client'
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type ProjectAccess = {
  id: string;
  role: string;
  email: string;
  user_id: string;
  first_name: string;
  last_name: string;
};

export const ProjectAccessColumns: ColumnDef<ProjectAccess>[] = [
  {
    header: "User",
    accessorKey: "user_id",
    cell: ({ row }) => {
      const { first_name, last_name, user_id } = row.original;
      return <Link href={`/profile/${user_id}`}>{first_name + " " + last_name}</Link>;
    },
  },
  { 
    header : 'Email',
    accessorKey : "email", 
  },
  { 
    header : "Role", 
    accessorKey : 'role'
  }
];
