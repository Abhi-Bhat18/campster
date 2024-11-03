import { ColumnDef } from "@tanstack/react-table";

export type Email = {
  id: string;
  email: string;
  status: "sent" | "failed" | "rejected" | "soft-bounce" | "hard-bounce";
  updated_at: Date;
  created_at: Date;
};

export const emailColumns: ColumnDef<Email>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Updated At",
    accessorKey: "updated_at",
    cell: ({ row }) => {
      const { updated_at } = row.original;
      return <div>{new Date(updated_at).toDateString()}</div>;
    },
  },
  {
    header: "Created At",
    accessorKey: "sent_at",
    cell: ({ row }) => {
      const { created_at } = row.original;
      return <div>{new Date(created_at).toDateString()}</div>;
    },
  },
];
