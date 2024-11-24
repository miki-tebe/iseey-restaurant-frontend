import { z } from "zod";

export const createTableStandSchema = z.object({
  priceId: z.string().max(500).optional(),
  product_id: z.string().max(500).optional(),
  quantity: z.number().optional(),
  unit_amount: z.number().optional(),
  description: z.string().max(500).optional(),
});
