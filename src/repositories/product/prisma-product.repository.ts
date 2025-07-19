import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Product): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(params: {
    skip: number;
    take: number;
    orderBy: { name: 'asc' | 'desc' };
  }): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { deletedAt: null },
      skip: params.skip,
      take: params.take,
      orderBy: params.orderBy,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findFirst({ where: { id, deletedAt: null } });
  }

  async findBySku(sku: string): Promise<Product | null> {
    return this.prisma.product.findFirst({ where: { sku, deletedAt: null } });
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!product) throw new Error('Produto não encontrado');

    return this.prisma.product.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async softDelete(id: string): Promise<void> {
    const product = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!product) throw new Error('Produto não encontrado');

    await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
