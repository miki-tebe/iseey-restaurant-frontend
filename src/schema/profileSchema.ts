import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255)
    .optional(),
  resImage: z.string().optional(),
  image: z.string().optional(),
  address: z.string().max(255).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  email: z.string().email().optional(),
  phoneNumber: z
    .string({
      message: "Invalid phone number",
      invalid_type_error: "Invalid phone number",
    })
    .optional(),
  number_of_tables: z.union([
    z.string().optional(),
    z.number().min(1).max(100).optional(),
  ]),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  password: z.string().min(8).optional(),
  confirmPassword: z.string().min(8).optional(),
  menu: z.string().optional(),
  menuType: z.enum(["url", "file"]).optional(),
  drinkMenu: z.string().optional(),
  drinkMenuType: z.enum(["url", "file"]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
