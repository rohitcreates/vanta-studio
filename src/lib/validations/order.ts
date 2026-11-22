import { z } from "zod";

export const OrderSchema = z.object({
  paymentMethod: z.string().min(1),

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
      productId: z.number().int().positive(),
      quantity: z.number().int().min(1),
      size: z.string().min(1),
      color: z.string().min(1),
    })
  ).min(1),
});
