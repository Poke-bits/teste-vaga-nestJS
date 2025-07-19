import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';
import { ProductOutputGetDto } from 'src/dto/product/get';
import { toProductResponse } from 'src/mappers/Product';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

@Injectable()
export class ListProductsUseCase {
  private readonly logger = new Logger(ListProductsUseCase.name);
  
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(page = 1, pageSize = 10): Promise<ProductOutputGetDto[]> {
    this.logger.log(`Iniciando listagem de produtos - Página: ${page}, PageSize: ${pageSize}`);
    const skip = (page - 1) * pageSize;
    this.logger.debug(`Calculado skip: ${skip} para página ${page}`);

    const products = await this.productRepository.findAll({
      skip,
      take: pageSize,
      orderBy: { name: 'asc' },
    });
    this.logger.debug(`Produtos encontrados no banco: ${products.length}`);

    const result = products.map(toProductResponse);
    this.logger.log(`Listagem concluída - ${result.length} produtos retornados`);
    return result;
  }
}