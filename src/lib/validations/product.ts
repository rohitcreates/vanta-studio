import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
});

export type ProductInput = z.infer<typeof ProductSchema>;