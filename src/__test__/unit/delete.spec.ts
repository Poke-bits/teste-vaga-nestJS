import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { ProductRepository } from 'src/repositories/product/product.repository';
import { DeleteProductUseCase } from 'src/use-cases/product/delete';

const mockProduct: Product = {
  id: uuidv4(),
  name: 'Test Product',
  price: 99.99,
  sku: 'TEST-SKU',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe('DeleteProductUseCase', () => {
  let useCase: DeleteProductUseCase;
  let mockRepo: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    mockRepo = {
      findById: jest.fn(),
      softDelete: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
        { provide: ProductRepository, useValue: mockRepo },
      ],
    }).compile();

    useCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should soft delete a product when it exists', async () => {
    mockRepo.findById.mockResolvedValueOnce(mockProduct);

    await useCase.execute(mockProduct.id);

    expect(mockRepo.findById).toHaveBeenCalledWith(mockProduct.id);
    expect(mockRepo.softDelete).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should throw NotFoundException when product does not exist', async () => {
    mockRepo.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockProduct.id)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findById).toHaveBeenCalledWith(mockProduct.id);
    expect(mockRepo.softDelete).not.toHaveBeenCalled();
  });
});
