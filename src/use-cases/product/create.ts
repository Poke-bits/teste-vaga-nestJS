import { Injectable, ConflictException, Inject, Logger } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../../dto/product/create';
import { ProductEntity } from '../../entities/product/product.entity';
import { ProductRepository } from '../../repositories/product/product.repository';
import { PRODUCT_REPOSITORY } from '../../constants/token';

@Injectable()
export class CreateProductUseCase {
  private readonly logger = new Logger(CreateProductUseCase.name);
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
  ) {}

  async execute(data: CreateProductDto): Promise<Product> {
    this.logger.log(`Iniciando criação de produto com SKU: ${data.sku}`);
    const existing = await this.productRepository.findBySku(data.sku);
    this.logger.debug(`Verificando se SKU ${data.sku} já existe`);
    if (existing) {
      this.logger.warn(
        `Tentativa de criar produto com SKU duplicado: ${data.sku}`
      );
      throw new ConflictException('SKU already exists');
    }
    this.logger.debug(
      `SKU ${data.sku} disponível, criando entidade do produto`
    );
    const productEntity = new ProductEntity(data.toObject());

    const productToCreate = {
      name: productEntity.name,
      price: productEntity.price,
      sku: productEntity.sku,
      createdAt: productEntity.createdAt,
      updatedAt: productEntity.createdAt,
      deletedAt: productEntity.deletedAt ?? null,
    };
    this.logger.debug(
      `Salvando produto no repositório: ${JSON.stringify(productToCreate)}`
    );
    const result = await this.productRepository.create(productToCreate);
    this.logger.log(
      `Produto criado com sucesso - ID: ${result.id}, SKU: ${result.sku}`
    );
    return result;
  }
}
