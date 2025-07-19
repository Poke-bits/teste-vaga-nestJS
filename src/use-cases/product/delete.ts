import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product/product.repository';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

@Injectable()
export class DeleteProductUseCase {
  private readonly logger = new Logger(DeleteProductUseCase.name);
  
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    this.logger.log(`Iniciando remoção de produto com ID: ${id}`);
    const product = await this.productRepository.findById(id);
    this.logger.debug(`Verificando se produto com ID ${id} existe`);
    if (!product || product.deletedAt) {
      this.logger.warn(
        `Tentativa de remover produto inexistente ou já removido: ${id}`
      );
      throw new NotFoundException('Product not found');
    }

    this.logger.debug(`Produto encontrado, realizando soft delete: ${id}`);
    await this.productRepository.softDelete(id);
    this.logger.log(`Produto removido com sucesso - ID: ${id}`);
  }
}