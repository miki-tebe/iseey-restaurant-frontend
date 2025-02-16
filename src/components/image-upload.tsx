"use client";

import type React from "react";
import { useCallback } from "react";
import { useImageUpload } from "@/hooks/use-image-upload";
import ProgressBar from "@/components/progress-bar";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  onUploadComplete: (imageUrl: string) => void;
  type: "food" | "drink" | "restaurant";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  type,
}) => {
  const { uploadImage, progress, error, uploading } = useImageUpload();

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          const result = await uploadImage(file, type);
          onUploadComplete(result.data.url);
        } catch (err) {
          console.error("Upload failed:", err);
        }
      }
    },
    [uploadImage, onUploadComplete]
  );

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <ProgressBar progress={progress} />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
