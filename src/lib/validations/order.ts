import { z } from "zod";

export const OrderSchema = z.object({
  userId: z.number().int().positive(),

  paymentMethod: z.string(),

  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),

  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(6),

  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
      size: z.string(),
      color: z.string(),
    })
  ),
});