"use client";

import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { File, Folder } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Document = {
  id: string;
  name: string;
  owner_name: string;
  file_size?: number;
  created_at: Date;
  file_type: "folder" | "document";
};

export type Folder = {
  id: string;
  name: string;
  owner_name: string;
  created_at: Date;
  file_type: "folder" | "document";
};

export const columns: ColumnDef<Document | Folder>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const fileType = row.getValue("file_type");
      const fileName = row.getValue<string>("name");
      const id = row.getValue<string>("id");

      return (
        <div className="flex gap-8">
          {fileType === "folder" ? (
            <>
              <div>
                <Folder />
              </div>
              <Link className="underline" href={`/folders/${id}`}>
                {fileName}
              </Link>
            </>
          ) : (
            <>
              <div>
                <File />
              </div>
              <div>{fileName}</div>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "owner_name",
    header: "Created By",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = formatDate(new Date(row.getValue("created_at")));

      return <div>{`${createdAt}`}</div>;
    },
  },
  {
    accessorKey: "file_size",
    header: "File Size",
    cell: ({ row }) => {
      const fileSize = parseFloat(row.getValue("file_size"));

      return fileSize ? <div>{`${fileSize} KB`}</div> : <div>-</div>;
    },
  },
  {
    accessorKey: "file_type",
    header: () => {},
    cell: () => {},
  },
  {
    accessorKey: "id",
    header: () => {},
    cell: () => {},
  },
];
