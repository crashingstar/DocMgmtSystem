"use client";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UploadFileButton } from "./_components/upload-file-button";
import { UploadFolderButton } from "./_components/upload-folder-button";
import { API_URL } from "@/constant";
import { useDocuments } from "@/hooks/useDocuments";
import SearchInput from "./_components/search-input";

export default function DocumentPage() {
  const { data, loading, fetchDocumentsAndFolders } = useDocuments();

  async function uploadFile(values: {
    name: string;
    file_size: number;
    owner_name: string;
  }) {
    const response = await fetch(`${API_URL}document`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast("Error uploading file");
      return;
    }
    toast("File Uploaded");

    fetchDocumentsAndFolders();
  }

  async function uploadFolder(values: { name: string; owner_name: string }) {
    const response = await fetch(`${API_URL}folder`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast("Error uploading folder");
      return;
    }
    toast("Folder Uploaded");

    fetchDocumentsAndFolders();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 ">
      <div className="text-4xl">Documents</div>
      <div className="flex justify-between">
        <SearchInput />
        <div className="flex gap-4">
          <UploadFileButton uploadFile={uploadFile} />
          <UploadFolderButton uploadFolder={uploadFolder} />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
