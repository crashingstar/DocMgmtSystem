import { Folder } from "@/app/documents/columns";
import { API_URL } from "@/constant";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function useFolderData(folderId?: string) {
  const [folderData, setFolderData] = useState<Folder | null>(null);

  const fetchFolderData = useCallback(async () => {
    if (!folderId) return;

    try {
      const res = await fetch(`${API_URL}/folder/${folderId}`);

      if (!res.ok) {
        toast("Cannot retrieve folder details");
        return;
      }

      const { result } = await res.json();

      if (result.length > 0) {
        setFolderData(result[0]);
      }
    } catch (err) {
      console.error(err);
      toast("Error fetching folder data");
    }
  }, [folderId]);

  useEffect(() => {
    fetchFolderData();
  }, [fetchFolderData]);

  return { folderData, fetchFolderData };
}
