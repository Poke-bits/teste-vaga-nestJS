import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters long')
    .regex(/^[a-zA-Z0-9\s\-_'"]+$/, 'Name contains invalid characters'),

  price: z
    .number({ message: 'Price must be a number' })
    .positive('Price must be greater than zero'),

  sku: z
    .string()
    .min(1, 'SKU is required')
    .max(30, 'SKU must be at most 30 characters long')
    .regex(/^[A-Z0-9\-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
