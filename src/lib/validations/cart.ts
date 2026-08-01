import { z } from "zod";

export const AddToCartSchema = z.object({
  userId: z.number().int().positive(),
  productId: z.number().int().positive(),
});

export const UpdateCartSchema = z.object({
  cartItemId: z.number().int().positive(),
  quantity: z.number().min(1),
});