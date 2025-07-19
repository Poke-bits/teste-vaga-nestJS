import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';
import { firstMissingAlphabetLetter } from '../../utils/alphabet';
import { ProductOutputGetDto } from '../../../src/dto/product/get';
import { toProductResponse } from '../../../src/mappers/Product';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductOutputGetDto> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

   return toProductResponse(product);
  }
}
