import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';
import { ProductOutputGetDto } from 'src/dto/product/get';
import { toProductResponse } from 'src/mappers/Product';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

@Injectable()
export class GetProductUseCase {
  private readonly logger = new Logger(GetProductUseCase.name);
  
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<ProductOutputGetDto> {
    this.logger.log(`Iniciando busca de produto com ID: ${id}`);
    const product = await this.productRepository.findById(id);
    this.logger.debug(`Verificando se produto com ID ${id} existe`);

    if (!product) {
      this.logger.warn(`Produto não encontrado: ${id}`);
      throw new NotFoundException('Product not found');
    }

    this.logger.debug(`Produto encontrado, convertendo para response: ${id}`);
    const result = toProductResponse(product);
    this.logger.log(`Produto retornado com sucesso - ID: ${id}, SKU: ${product.sku}`);
    return result;
  }
}