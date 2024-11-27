import { z } from "zod";

export const offerFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255),
  description: z.string().max(500),
  image: z.string().optional(),
  photo: z.string().optional(), // required for file upload
  currency: z.string().max(10).optional(),
  code: z.string().max(50).optional(),
  discount: z.union([z.string(), z.number().min(1).max(100)]),
  offer_type: z.enum(["percentage", "flat"]),
  start_date: z.union([z.string(), z.number()]),
  end_date: z.union([z.string(), z.number()]),
});
