import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { addOffer } from "@/app/actions";
import { OfferFormType } from "@/schema/offerFormSchema";
import { useRouter } from "next/navigation";

export function useAddOffer() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: Partial<OfferFormType>) => {
      const response = await addOffer(values);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Offer created successfully");
      console.log("created offer", data);
      router.push("/dashboard/offers");
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // navigation({ to: "/transactions" });
    },
    onError: (error) => {
      console.log("faild to create offer", error);
      toast.error(`Failed to create offer`);
    },
  });

  return mutation;
}
