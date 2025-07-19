import { Injectable, NotFoundException, ConflictException, Inject, Logger } from '@nestjs/common';
import { Product } from '@prisma/client';
import { UpdateProductDto } from '../../dto/product/update';
import { ProductEntity } from '../../entities/product/product.entity';
import { ProductRepository } from '../../repositories/product/product.repository';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

@Injectable()
export class UpdateProductUseCase {
  private readonly logger = new Logger(UpdateProductUseCase.name);
  
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: string, data: UpdateProductDto): Promise<Product> {
    this.logger.log(`Iniciando atualização de produto com ID: ${id}`);
    const productExists = await this.productRepository.findById(id);
    this.logger.debug(`Verificando se produto com ID ${id} existe`);
    if (!productExists) {
      this.logger.warn(`Tentativa de atualizar produto inexistente: ${id}`);
      throw new NotFoundException('Product not found');
    }

    if (data.sku && data.sku !== productExists.sku) {
      this.logger.debug(`SKU será alterado de ${productExists.sku} para ${data.sku}, verificando duplicata`);
      const skuExists = await this.productRepository.findBySku(data.sku);
      if (skuExists) {
        this.logger.warn(
          `Tentativa de atualizar produto ${id} com SKU duplicado: ${data.sku}`
        );
        throw new ConflictException('SKU already exists');
      }
    }
    
    this.logger.debug(`Criando entidade atualizada para produto: ${id}`);
    const updatedProduct = new ProductEntity({
      ...productExists,
      ...data,
      id,
    });

    this.logger.debug(`Salvando produto atualizado no repositório: ${id}`);
    const result = await this.productRepository.update(id, updatedProduct);
    this.logger.log(
      `Produto atualizado com sucesso - ID: ${id}, SKU: ${result.sku}`
    );
    return result;
  }
}