import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductUseCase } from 'src/use-cases/product/update';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { UpdateProductDto } from 'src/dto/product/update';

const mockProduct: Product = {
  id: uuidv4(),
  name: 'Produto Atual',
  price: 100,
  sku: 'SKU-OLD',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductUseCase,
        {
          provide: ProductRepository,
          useValue: {
            findById: jest.fn(),
            findBySku: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(UpdateProductUseCase);
    productRepository = module.get(ProductRepository);
  });

  it('deve atualizar o produto com sucesso (caminho feliz)', async () => {
    const updateData: UpdateProductDto = { name: 'Atualizado', sku: 'SKU-NEW' };

    productRepository.findById.mockResolvedValue(mockProduct);
    productRepository.findBySku.mockResolvedValue(null);
    productRepository.update.mockResolvedValue({ ...mockProduct, ...updateData });

    const result = await useCase.execute(mockProduct.id, updateData);

    expect(result.name).toBe('Atualizado');
    expect(result.sku).toBe('SKU-NEW');
    expect(productRepository.update).toHaveBeenCalled();
  });

  it('deve lançar NotFoundException se o produto não existir (caminho triste)', async () => {
    productRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(mockProduct.id, {})).rejects.toThrow(NotFoundException);
  });

  it('deve lançar ConflictException se o novo SKU já existir (caminho triste)', async () => {
    productRepository.findById.mockResolvedValue(mockProduct);
    productRepository.findBySku.mockResolvedValue({ ...mockProduct, id: 'diferente' });

    await expect(
      useCase.execute(mockProduct.id, { sku: 'DUPLICADO' }),
    ).rejects.toThrow(ConflictException);
  });
});
