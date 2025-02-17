"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { getToken } from "@/app/actions";

interface UploadState {
  progress: number;
  error: string | null;
  uploading: boolean;
}

export const useImageUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    progress: 0,
    error: null,
    uploading: false,
  });

  const uploadImage = useCallback(
    async (file: File, type: "food" | "drink" | "restaurant") => {
      const url =
        type === "restaurant"
          ? "http://localhost:5002/api/upload/restaurant"
          : `http://localhost:5002/api/upload/menu?menuType=${type}`;
      setUploadState({ progress: 0, error: null, uploading: true });
      const token = await getToken();

      if (!token) return;

      const formData = new FormData();
      formData.append("picture", file);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            );
            setUploadState((prev) => ({
              ...prev,
              progress: percentCompleted,
            }));
          },
        });

        setUploadState((prev) => ({ ...prev, uploading: false }));
        return response.data;
      } catch (error) {
        setUploadState((prev) => ({
          ...prev,
          error: "Upload failed. Please try again.",
          uploading: false,
        }));
        throw error;
      }
    },
    []
  );

  return { uploadImage, ...uploadState };
};
