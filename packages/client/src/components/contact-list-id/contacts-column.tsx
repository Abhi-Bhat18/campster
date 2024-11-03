import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type ContactType = {
  contact_id: string;
  contact_list_id: string;
  first_name: string;
  last_name?: string;
  email: string;
  opt_in: string;
  unsubscribed: string;
  is_valid_email: boolean;
};

export const contactsColumn: ColumnDef<ContactType>[] = [
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
    header: "First Name",
    accessorKey: "first_name",
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Opt In",
    accessorKey: "opt_in",
  },
  {
    header: "Unsubscribed",
    accessorKey: "unsubscribed",
  },
  {
    header: "Valid Email",
    accessorKey: "is_valid_email",
    cell: ({ row }) => {
      const { is_valid_email } = row.original;
      return <>{is_valid_email ? "Yes" : "No"} </>;
    },
  },
];
