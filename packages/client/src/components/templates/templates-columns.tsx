import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ScanEye } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import TemplatePreview from "./TemplatePreview";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Template } from "@/lib/features/email-template/emailTemplateSlice";

export const templateColumns: ColumnDef<Template>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, id } = row.original;

      return <Link href={`/templates/${id}`}>{name}</Link>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => {
      const { created_by, first_name, last_name } = row.original;
      return (
        <Link href={`/profile/${created_by}`}>
          {" "}
          {first_name + " " + last_name}{" "}
        </Link>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => {
      const { updated_at } = row.original;

      return <div>{new Date(updated_at).toDateString()}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const { created_at } = row.original;

      return <div>{new Date(created_at).toDateString()}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <>
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger>
                    <ScanEye className="h-4 w-4" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription className="">
                  <TemplatePreview template_id={id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
