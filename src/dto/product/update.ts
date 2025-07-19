import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UpdateProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must have at least 1 character')
    .max(100, 'Name must be at most 100 characters long')
    .regex(/^[a-zA-Z0-9\s\-_'"]+$/, 'Name contains invalid characters')
    .optional(),

  price: z
    .number({ message: 'Price must be a number' })
    .positive('Price must be greater than zero')
    .optional(),

  sku: z
    .string()
    .min(1, 'SKU must have at least 1 character')
    .max(30, 'SKU must be at most 30 characters long')
    .regex(/^[A-Z0-9\-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens')
    .optional(),
});

export class UpdateProductDto extends createZodDto(UpdateProductSchema) {}
