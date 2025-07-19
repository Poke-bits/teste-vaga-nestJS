import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { DeleteProductUseCase } from 'src/use-cases/product/delete';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

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
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: {
            findById: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
    productRepository = module.get(PRODUCT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should soft delete a product when it exists', async () => {
    productRepository.findById.mockResolvedValueOnce(mockProduct);

    await useCase.execute(mockProduct.id);

    expect(productRepository.findById).toHaveBeenCalledWith(mockProduct.id);
    expect(productRepository.softDelete).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should throw NotFoundException when product does not exist', async () => {
    productRepository.findById.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockProduct.id)).rejects.toThrow(NotFoundException);

    expect(productRepository.findById).toHaveBeenCalledWith(mockProduct.id);
    expect(productRepository.softDelete).not.toHaveBeenCalled();
  });
});
