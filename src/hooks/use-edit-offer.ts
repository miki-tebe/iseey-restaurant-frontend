import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { updateOffer } from "@/app/actions";
import { EditOfferFormType } from "@/schema/offerEditSchema";

export function useEditOffer() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({
      values,
      id,
    }: {
      values: EditOfferFormType;
      id: string;
    }) => {
      const response = await updateOffer(values, id);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Offer updated successfully");
      console.log("data", data);
      router.push("/dashboard/offers");
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // navigation({ to: "/transactions" });
    },
    onError: (error) => {
      console.log("error is", error);
      toast.error(`Failed to update offer`);
    },
  });

  return mutation;
}
