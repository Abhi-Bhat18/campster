import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";

type TransactionalEmail = {
  id: string;
  from_email: string;
  to_email: string;
  reply_to: string;
  content_text: string;
  subject: string;
  sent_at: Date;
};

export const transactioinalEmailColumns: ColumnDef<TransactionalEmail>[] = [
  {
    header: "To",
    accessorKey: "to_email",
  },
  {
    header: "Subject",
    accessorKey: "subject",
  },
  {
    header: "Mail from",
    accessorKey: "from_email",
  },
  {
    header: "Sent",
    accessorKey: "sent_at",
    cell: ({ row }) => {
      const { sent_at } = row.original;

      return <div>{new Date(sent_at).toDateString()}</div>;
    },
  },
  {
    header: "Content Text",
    accessorKey: "content_text",
  },
];
