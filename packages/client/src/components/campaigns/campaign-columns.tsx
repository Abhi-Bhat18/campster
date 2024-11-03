import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

type Campaign = {
  id: string;
  name: string;
  scheduled_at: Date;
  status: string;
  created_by: string;
  first_name: string;
  last_name: string;
  template_id: string;
  template_name: string;
  contact_list_id: string;
  contact_list_name: string;
};

export const campaignColumns: ColumnDef<Campaign>[] = [
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
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, id } = row.original;
      return <Link href={`/campaigns/${id}`}>{name}</Link>;
    },
  },
  {
    header: "Created By",
    accessorKey: "created_by",
    cell: ({ row }) => {
      const { first_name, last_name, created_by } = row.original;
      return (
        <Link href={`/profile/${created_by}`}> {first_name + ' ' + last_name} </Link>
      );
    },
  },
  {
    header: "Scheduled at",
    accessorKey: "scheduled_at",
    cell: ({ row }) => {
      const { scheduled_at } = row.original;

      return <div> {new Date(scheduled_at).toDateString()} </div>;
    },
  },
  {
    header: "Email list",
    accessorKey: "contact_list_id",
    cell: ({ row }) => {
      const { contact_list_name, contact_list_id } = row.original;

      return (
        <Link href={`/contact-list/${contact_list_id}`}>
          {" "}
          {contact_list_name}{" "}
        </Link>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];
