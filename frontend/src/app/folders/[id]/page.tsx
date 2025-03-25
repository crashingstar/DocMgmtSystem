"use client";
import { toast } from "sonner";
import { UploadFileButton } from "../../documents/_components/upload-file-button";
import { UploadFolderButton } from "../../documents/_components/upload-folder-button";
import { columns } from "../../documents/columns";
import { DataTable } from "../../documents/data-table";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/constant";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { useFolderData } from "@/hooks/useFolderData";
import SearchInput from "@/app/documents/_components/search-input";

export default function FolderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data, loading, fetchDocumentsAndFolders } = useDocuments(params.id);
  const { folderData } = useFolderData(params?.id);
  async function uploadFile(values: {
    name: string;
    file_size: number;
    owner_name: string;
  }) {
    const response = await fetch(`${API_URL}document`, {
      method: "POST",
      body: JSON.stringify({ ...values, folder_id: params.id }),
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
      body: JSON.stringify({ ...values, parent_id: params.id }),
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
      <Button className="w-20" variant="outline" onClick={router.back}>
        <ArrowLeft />
        Back
      </Button>
      <div className="text-4xl">{`Folder: ${folderData?.name}`}</div>
      <div className="flex justify-between">
        <SearchInput />
        <div className="flex gap-4">
          <UploadFileButton folder_id={params.id} uploadFile={uploadFile} />
          <UploadFolderButton
            parent_id={params.id}
            uploadFolder={uploadFolder}
          />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
