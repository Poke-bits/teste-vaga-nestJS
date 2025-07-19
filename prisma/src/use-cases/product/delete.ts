import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.softDelete(id);
  }
}
