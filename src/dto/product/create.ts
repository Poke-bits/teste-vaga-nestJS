import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9\s\-_'"]+$/),
  price: z.number().positive(),
  sku: z
    .string()
    .min(1)
    .max(30)
    .regex(/^[A-Z0-9\-]+$/),
});

// Cria DTO compatível com Swagger + NestJS
export class CreateProductDto extends createZodDto(CreateProductSchema) {}
