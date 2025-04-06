// "use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/app/actions";
import { ProfileFormValues } from "@/schema/profileSchema";
import { useRouter } from "next/navigation";

export function useEditProfile() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ values }: { values: ProfileFormValues }) => {
      const response = await updateProfile(values);
      return response;
    },
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.errorMessage);
      } else {
        toast.success("Profile updated successfully");
        // console.log("data", data);
        router.push("/dashboard/index");
      }
    },
    // onError: (error) => {
    //   console.log("error is", error.message);
    //   // console.log("error digest", error.digest);
    //   const errorMessage =
    //     error instanceof Error ? error.message : "Failed to update profile";

    //   toast.error(errorMessage);
    // },
  });

  return mutation;
}
