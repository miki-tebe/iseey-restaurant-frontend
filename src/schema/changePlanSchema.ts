import { z } from "zod";

export const changePlanSchema = z.object({
  plan: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255)
    .optional(),
  priceId: z.string().max(500).optional(),
});
