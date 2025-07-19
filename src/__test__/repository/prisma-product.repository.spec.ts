import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, Product } from '@prisma/client';
import { PrismaProductRepository } from 'src/repositories/product/prisma-product.repository';
import { v4 as uuidv4 } from 'uuid';

const mockProduct: Product = {
  id: uuidv4(),
  name: 'Test Product',
  price: 99.99,
  sku: 'TEST-SKU',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const mockPrismaClient = {
  product: {
    create: jest.fn().mockResolvedValue(mockProduct),
    findMany: jest.fn().mockResolvedValue([mockProduct]),
    findFirst: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
  },
};

describe('PrismaProductRepository', () => {
  let repository: PrismaProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaProductRepository,
        {
          provide: PrismaClient,
          useValue: mockPrismaClient,
        },
      ],
    }).compile();

    repository = module.get<PrismaProductRepository>(PrismaProductRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a product', async () => {
    const createdProduct = await repository.create(mockProduct);
    expect(createdProduct).toEqual(mockProduct);
    expect(mockPrismaClient.product.create).toHaveBeenCalledWith({
      data: mockProduct,
    });
  });

  it('should find all products', async () => {
    const params = { skip: 0, take: 10, orderBy: { name: 'asc' as const } };
    const products = await repository.findAll(params);
    expect(products).toEqual([mockProduct]);
    expect(mockPrismaClient.product.findMany).toHaveBeenCalledWith({
      where: { deletedAt: null },
      ...params,
    });
  });

  it('should find a product by id', async () => {
    const product = await repository.findById(mockProduct.id);
    expect(product).toEqual(mockProduct);
    expect(mockPrismaClient.product.findFirst).toHaveBeenCalledWith({
      where: { id: mockProduct.id, deletedAt: null },
    });
  });

  it('should find a product by sku', async () => {
    const product = await repository.findBySku(mockProduct.sku);
    expect(product).toEqual(mockProduct);
    expect(mockPrismaClient.product.findFirst).toHaveBeenCalledWith({
      where: { sku: mockProduct.sku, deletedAt: null },
    });
  });

  it('should update a product', async () => {
    const updateData = { name: 'Updated Product' };
    const updatedProduct = await repository.update(mockProduct.id, updateData);
    expect(updatedProduct).toEqual(mockProduct);
    expect(mockPrismaClient.product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id, deletedAt: null },
      data: { ...updateData, updatedAt: expect.any(Date) },
    });
  });

  it('should soft delete a product', async () => {
    await repository.softDelete(mockProduct.id);
    expect(mockPrismaClient.product.update).toHaveBeenCalledWith({
      where: { id: mockProduct.id },
      data: { deletedAt: expect.any(Date) },
    });
  });
});