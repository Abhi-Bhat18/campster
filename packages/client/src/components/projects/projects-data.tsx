import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserCircle } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  project_name: string;
  first_name: string;
  last_name: string;
  img_url: string;
  status: "active" | "de-activated";
  created_at: string;
  role: "owner" | "manager" | "admin" | "analyst";
};

export const projectData: Project[] = [
  {
    id: "6cf32c84-5a41-4b0a-924e-d5fd3cf889f5",
    project_name: "Alpha Development",
    first_name: "Michael",
    last_name: "Smith",
    img_url: "https://dummyimage.com/200x200",
    status: "active",
    created_at: "2023-09-15T10:30:00Z",
    role: "owner",
  },
  {
    id: "2e51e024-43af-44f4-90c2-1c19a7bb6c95",
    project_name: "Beta Launch",
    first_name: "Emily",
    last_name: "Johnson",
    img_url: "https://dummyimage.com/200x200",
    status: "active",
    created_at: "2023-07-22T09:00:00Z",
    role: "manager",
  },
  {
    id: "d69e7e5e-d3a5-4c47-9dbd-df86e1c3a6b1",
    project_name: "Gamma Analytics",
    first_name: "James",
    last_name: "Brown",
    img_url: "https://placekitten.com/200/200",
    status: "de-activated",
    created_at: "2023-05-10T08:15:00Z",
    role: "analyst",
  },
  {
    id: "8b8a4e2a-62b9-4023-bb56-7f99f0e50458",
    project_name: "Delta System Upgrade",
    first_name: "Olivia",
    last_name: "Davis",
    img_url: "https://placekitten.com/200/200",
    status: "active",
    created_at: "2023-02-01T12:45:00Z",
    role: "admin",
  },
  {
    id: "5fa50e9b-0c2b-4794-ae96-5f3dd4509b5a",
    project_name: "Zeta Expansion",
    first_name: "William",
    last_name: "Garcia",
    img_url: "https://dummyimage.com/200x200",
    status: "active",
    created_at: "2022-12-20T14:00:00Z",
    role: "owner",
  },
  {
    id: "9d17c6db-2e53-4c34-a541-e5db7b510e57",
    project_name: "Omega Architecture",
    first_name: "Sophia",
    last_name: "Martinez",
    img_url: "https://dummyimage.com/200x200",
    status: "de-activated",
    created_at: "2022-11-10T16:30:00Z",
    role: "manager",
  },
  {
    id: "cb4cf34b-dbf7-4630-a1ab-ff167f4a5e1c",
    project_name: "Epsilon Marketing",
    first_name: "Liam",
    last_name: "Rodriguez",
    img_url: "https://placekitten.com/200/200",
    status: "active",
    created_at: "2023-06-05T09:45:00Z",
    role: "admin",
  },
  {
    id: "bfa45b75-86b1-4c69-80b1-2bc98a307ef6",
    project_name: "Theta Integration",
    first_name: "Isabella",
    last_name: "Wilson",
    img_url: "https://dummyimage.com/200x200",
    status: "active",
    created_at: "2023-08-25T11:15:00Z",
    role: "analyst",
  },
  {
    id: "c8495cfc-d90e-47c7-92b4-cc0f94e9f462",
    project_name: "Sigma Platform",
    first_name: "Elijah",
    last_name: "Lee",
    img_url: "https://dummyimage.com/200x200",
    status: "de-activated",
    created_at: "2023-03-18T13:30:00Z",
    role: "manager",
  },
  {
    id: "de4bce97-cb1f-4709-a85f-f52f162e4f65",
    project_name: "Lambda Research",
    first_name: "Ava",
    last_name: "Hernandez",
    img_url: "https://placekitten.com/200/200",
    status: "active",
    created_at: "2023-01-10T15:00:00Z",
    role: "owner",
  },
];

export const columns: ColumnDef<Project>[] = [
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
    accessorKey: "project_name",
    header: "Project Name",
    cell: ({ row }) => {
      const { id, project_name } = row.original;

      return <Link href={`/projects/${id}`}>{project_name}</Link>;
    },
  },
  {
    accessorKey: "first_name",
    header: "Owner",
    cell: ({ row }) => {
      const { first_name, last_name, img_url } = row.original;

      return (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={img_url} />
            <AvatarFallback className="flex justify-center items-center">
              <UserCircle className="w-full" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{first_name + " " + last_name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
