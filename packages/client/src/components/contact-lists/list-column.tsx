"use client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

import { Lists } from "@/lib/features/contact-list/contactList.slice";

export const ContactListColumns: ColumnDef<Lists>[] = [
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
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const { id, name } = row.original;
      return <Link href={`/contact-lists/${id}`}>{name}</Link>;
    },
  },
  {
    header: "Email Type",
    accessorKey: "email_type",
  },
  {
    header: "Opt In",
    accessorKey: "email_opt_in",
  },
  {
    header: "Contacts",
    accessorKey: "total_contacts",
  },
  {
    header: "Created by",
    accessorKey: "created_by",
    cell: ({ row }) => {
      const { first_name, last_name, created_by } = row.original;
      return (
        <Link href={`/profile/${created_by}`}>
          {" "}
          {first_name + " " + last_name}{" "}
        </Link>
      );
    },
  },
  {
    header: "Created at",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return <div>{new Date(created_at).toDateString()} </div>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
