import { Injectable, Logger } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  private readonly logger = new Logger(PrismaProductRepository.name);
  
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Product): Promise<Product> {
    this.logger.log(`Criando produto no banco - SKU: ${data.sku}`);
    const result = await this.prisma.product.create({ data });
    this.logger.debug(`Produto criado no banco - ID: ${result.id}, SKU: ${result.sku}`);
    return result;
  }

  async findAll(params: {
    skip: number;
    take: number;
    orderBy: { name: 'asc' | 'desc' };
  }): Promise<Product[]> {
    this.logger.log(
      `Buscando produtos no banco - skip: ${params.skip}, take: ${params.take}`
    );
    const result = await this.prisma.product.findMany({
      where: { deletedAt: null },
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
    });
    this.logger.debug(`Encontrados ${result.length} produtos no banco`);
    return result;
  }

  async findById(id: string): Promise<Product | null> {
    this.logger.debug(`Buscando produto no banco por ID: ${id}`);
    const result = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    this.logger.debug(
      `Resultado busca por ID ${id}: ${result ? 'encontrado' : 'não encontrado'}`
    );
    return result;
  }

  async findBySku(sku: string): Promise<Product | null> {
    this.logger.debug(`Buscando produto no banco por SKU: ${sku}`);
    const result = await this.prisma.product.findFirst({ where: { sku, deletedAt: null } });
    this.logger.debug(
      `Resultado busca por SKU ${sku}: ${result ? 'encontrado' : 'não encontrado'}`
    );
    return result;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    this.logger.log(`Atualizando produto no banco - ID: ${id}`);
    const product = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!product) {
      this.logger.error(`Produto não encontrado para atualização - ID: ${id}`);
      throw new Error('Produto não encontrado');
    }

    const result = await this.prisma.product.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    this.logger.debug(
      `Produto atualizado no banco - ID: ${result.id}, SKU: ${result.sku}`
    );
    return result;
  }

  async softDelete(id: string): Promise<void> {
    this.logger.log(`Realizando soft delete no banco - ID: ${id}`);
    const product = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!product) {
      this.logger.error(`Produto não encontrado para soft delete - ID: ${id}`);
      throw new Error('Produto não encontrado');
    }

    await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    this.logger.debug(`Soft delete realizado no banco - ID: ${id}`);
  }
}