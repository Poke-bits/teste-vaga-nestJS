import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDto } from '../../dto/product/update';
import { ProductEntity } from '../../entities/product/product.entity';
import { ProductRepository } from '../../repositories/product/product.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDto): Promise<Product> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    if (data.sku && data.sku !== productExists.sku) {
      const skuExists = await this.productRepository.findBySku(data.sku);
      if (skuExists) {
        throw new ConflictException('SKU already exists');
      }
    }
    const updatedProduct = new ProductEntity({
      ...productExists,
      ...data,
      id,
    });

    return this.productRepository.update(id, updatedProduct);
  }
}
