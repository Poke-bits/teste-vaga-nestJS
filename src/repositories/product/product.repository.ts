import { Product } from '@prisma/client';

export abstract class ProductRepository {
  abstract create(data: Omit<Product, 'id'>): Promise<Product>;
  abstract findAll(params: {
    skip: number;
    take: number;
    orderBy: { name: 'asc' | 'desc' };
  }): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findBySku(sku: string): Promise<Product | null>;
  abstract update(id: string, data: Partial<Product>): Promise<Product>;
  abstract softDelete(id: string): Promise<void>;
}
