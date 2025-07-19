import { Injectable, ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../../dto/product/create';
import { ProductEntity } from '../../entities/product/product.entity';
import { ProductRepository } from '../../repositories/product/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductDto): Promise<Product> {
    const existing = await this.productRepository.findBySku(data.sku);
    if (existing) {
      throw new ConflictException('SKU already exists');
    }
    const productEntity = new ProductEntity(data);

    const productToCreate = {
      name: productEntity.name,
      price: productEntity.price,
      sku: productEntity.sku,
      createdAt: productEntity.createdAt,
      updatedAt: productEntity.createdAt,
      deletedAt: productEntity.deletedAt ?? null,  
    };
    return this.productRepository.create(productToCreate);
  }
}
