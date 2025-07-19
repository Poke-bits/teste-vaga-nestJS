import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';
import { ProductOutputGetDto } from 'src/dto/product/get';
import { toProductResponse } from 'src/mappers/Product';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductOutputGetDto> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

   return toProductResponse(product);
  }
}
