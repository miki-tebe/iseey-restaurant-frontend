import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255),
  address: z.string().max(255).optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  number_of_tables: z.union([
    z.string().optional(),
    z.number().min(1).max(100).optional(),
  ]),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  logo: z.string().optional(),
  password: z.string().min(8).optional(),
  confirmPassword: z.string().min(8).optional(),
  menu: z.string().optional(),
  drinkMenu: z.string().optional(),
});
