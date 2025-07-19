import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { GetProductUseCase } from 'src/use-cases/product/get';
import { ProductOutputGetDto } from 'src/dto/product/get';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

const mockProduct: Product = {
  id: uuidv4(),
  name: 'Produto Teste',
  price: 149.99,
  sku: 'TEST-GET-001',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe('GetProductUseCase', () => {
  let useCase: GetProductUseCase;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetProductUseCase>(GetProductUseCase);
    productRepository = module.get(PRODUCT_REPOSITORY);
  });

  it('deve retornar o produto quando encontrado (caminho feliz)', async () => {
    productRepository.findById.mockResolvedValue(mockProduct);

    const result = await useCase.execute(mockProduct.id);

    const expectedProduct: ProductOutputGetDto = {
      name: mockProduct.name,
      price: mockProduct.price,
      sku: mockProduct.sku,
      missingLetter: 'a',
    };

    expect(result).toEqual(expectedProduct);
    expect(productRepository.findById).toHaveBeenCalledWith(mockProduct.id);
  });

  it('deve lançar NotFoundException quando o produto não for encontrado (caminho triste)', async () => {
    productRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(mockProduct.id)).rejects.toThrow(NotFoundException);
    expect(productRepository.findById).toHaveBeenCalledWith(mockProduct.id);
  });
});
