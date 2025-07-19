import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { CreateProductDto } from 'src/dto/product/create';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { CreateProductUseCase } from 'src/use-cases/product/create';
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

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let mockProductRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    mockProductRepository = {
      findBySku: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        { provide: PRODUCT_REPOSITORY, useValue: mockProductRepository },
      ],
    }).compile();

    useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a product when SKU does not exist', async () => {
    mockProductRepository.findBySku.mockResolvedValue(null);
    mockProductRepository.create.mockResolvedValue(mockProduct);

    const dto: CreateProductDto = {
      name: 'Test Product',
      price: 99.99,
      sku: 'TEST-SKU',
    };

    const result = await useCase.execute(dto);

    expect(result).toEqual(mockProduct);
    expect(mockProductRepository.findBySku).toHaveBeenCalledWith(dto.sku);
    expect(mockProductRepository.create).toHaveBeenCalled();
  });

  // it('should throw ConflictException if SKU already exists', async () => {
  //   mockProductRepository.findBySku.mockResolvedValue(mockProduct); 

  //   const dto: CreateProductDto = {
  //     name: 'Another Product',
  //     price: 199.99,
  //     sku: 'TEST-SKU',
  //   };

  //   await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
  //   expect(mockProductRepository.findBySku).toHaveBeenCalledWith(dto.sku);
  //   expect(mockProductRepository.create).not.toHaveBeenCalled();
  // });
});
