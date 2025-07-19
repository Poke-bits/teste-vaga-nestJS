import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';
import { ProductOutputGetDto } from '../../../src/dto/product/get';
import { toProductResponse } from '../../../src/mappers/Product';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(page = 1, pageSize = 10): Promise<ProductOutputGetDto[]> {
    const skip = (page - 1) * pageSize;

    const products = await this.productRepository.findAll({
      skip,
      take: pageSize,
      orderBy: { name: 'asc' },
    });

    return products.map(toProductResponse);
  }
}
