import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product/product.repository';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(page = 1, pageSize = 10): Promise<Product[]> {
    const skip = (page - 1) * pageSize;

    const products = await this.productRepository.findAll({
      skip,
      take: pageSize,
      orderBy: { name: 'asc' },
    });

    return products;
  }
}
