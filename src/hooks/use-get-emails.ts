"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { fetchEmails } from "@/app/actions";

export function useGetEmailMutation() {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetchEmails();
      return response;
    },
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.errorMessage);
        return [];
      } else {
        console.log("-----", data.data);
        return data.data;
      }
    },
  });

  return mutation;
}
