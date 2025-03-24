"use client";
import { Input } from "@/components/ui/input";

import { DataTable } from "./data-table";
import { columns, Document, Folder } from "./columns";
import { useEffect, useState } from "react";
import { UploadFileButton } from "./_components/upload-file-button";
import { UploadFolderButton } from "./_components/upload-folder-button";

export default function DocumentPage() {
  const [document, setDocument] = useState<Document[] | Folder[]>([]);
  useEffect(() => {
    async function fetchDocuments() {
      // const res = await fetch("https://api.vercel.app/blog");
      // const data = await res.json();

      setDocument([
        {
          id: "728ed52f",
          name: "document 1",
          owner_name: "John",
          file_size: 1,
          created_at: new Date(),
          file_type: "document",
        },
        {
          id: "728ed52feswarwe",
          name: "folder 1",
          owner_name: "John",
          created_at: new Date(),
          file_type: "folder",
        },
        // ...
      ]);
    }
    fetchDocuments();
  }, []);

  return (
    <div className="flex flex-col gap-8 ">
      <div className="text-4xl">Documents</div>
      <div className="flex justify-between">
        <Input className="w-1/5"></Input>
        <div className="flex gap-4">
          <UploadFileButton />
          <UploadFolderButton />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={document} />
      </div>
    </div>
  );
}
