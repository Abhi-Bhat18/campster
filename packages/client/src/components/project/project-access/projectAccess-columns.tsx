"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export type ProjectAccess = {
  id: string;
  role: string;
  email: string;
  user_id: string;
  first_name: string;
  last_name: string;
};

export const ProjectAccessColumns: ColumnDef<ProjectAccess>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "User",
    accessorKey: "user_id",
    cell: ({ row }) => {
      const { first_name, last_name, user_id } = row.original;
      return (
        <Link href={`/profile/${user_id}`}>{first_name + " " + last_name}</Link>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
];
