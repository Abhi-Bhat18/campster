"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export type APIKey = {
  api_key: string;
  created_by: string;
  first_name: string;
  last_name: string;
  expires_at: string;
  created_at: Date;
};

export const apiKeyColumns: ColumnDef<APIKey>[] = [
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
    header: "API Key",
    accessorKey: "api_key",
    cell: ({ row }) => {
      const { api_key } = row.original;
      const len = api_key.length;
      return <div>{`************${api_key.slice(len - 6)}`}</div>;
    },
  },
  {
    header: "Created By",
    accessorKey: "created_by",
    cell: ({ row }) => {
      const { first_name, last_name } = row.original;

      return <div>{first_name + " " + last_name}</div>;
    },
  },
  {
    header: "Expires At",
    accessorKey: "expires_at",
    cell: ({ row }) => {
      const { expires_at } = row.original;
      return <p>{new Date(expires_at).toDateString()}</p>;
    },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return <p>{new Date(created_at).toDateString()}</p>;
    },
  },
  {
    id: "copy",
    cell: ({ row }) => {

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(row.original.api_key);
          toast.success("Copied to clipboard");
        } catch (error) {
          console.error("Failed to copy:", error);
        }
      };

      return (
        <button onClick={handleCopy} aria-label="Copy API Key">
          <Copy className="h-5 w-5"/>
        </button>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
