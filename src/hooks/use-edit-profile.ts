import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/app/actions";
import { ProfileFormValues } from "@/schema/profileSchema";

export function useEditProfile() {
  const mutation = useMutation({
    mutationFn: async ({ values }: { values: ProfileFormValues }) => {
      const response = await updateProfile(values);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error is", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create restaurant";

      toast.error(errorMessage);
    },
  });

  return mutation;
}
