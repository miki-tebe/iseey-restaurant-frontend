"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/app/actions";

export function sendEmailMutation() {
  const mutation = useMutation({
    mutationFn: async (values: FormData) => {
      // for (let [key, value] of values.entries()) {
      //   console.log(`${key}:`, value);
      // }
      const response = await sendEmail(values);
      return response;
    },
    onSuccess: (data) => {
      if (data.isError) {
        toast.error(data.errorMessage);
      } else {
        toast.success("Email sent successfully!");
      }
    },
  });

  return mutation;
}

// export const sendEmailMutation = useMutation({
//   mutationFn: sendEmail,
//   onSuccess: (data) => {
//     if (data.isError) {
//       toast.error(data.errorMessage);
//     } else {
//       toast.success("Email sent successfully!");
//     }
//   },
// });
