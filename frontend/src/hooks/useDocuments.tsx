import { Folder, Document } from "@/app/documents/columns";
import { API_URL } from "@/constant";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useDocuments(folderId?: string) {
  const [data, setData] = useState<Document[] | Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDocumentsAndFolders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/document${folderId ? `?folder_id=${folderId}` : ""}`
      );
      if (!res.ok) {
        toast("Error fetching documents");
        return;
      }
      const { result: documentData } = await res.json();

      setData(documentData);
    } catch (err) {
      console.error(err);
      toast("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchDocumentsAndFolders();
  }, [fetchDocumentsAndFolders]);

  return { data, loading, fetchDocumentsAndFolders };
}
