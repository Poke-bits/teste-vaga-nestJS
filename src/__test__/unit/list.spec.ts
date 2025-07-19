import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { ListProductsUseCase } from 'src/use-cases/product/list';
import { ProductOutputGetDto } from 'src/dto/product/get';
import { Product } from '@prisma/client';
import { PRODUCT_REPOSITORY } from 'src/constants/token';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Produto A',
    price: 10,
    sku: 'SKU-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '2',
    name: 'Produto B',
    price: 20,
    sku: 'SKU-2',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

describe('ListProductsUseCase', () => {
  let useCase: ListProductsUseCase;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProductsUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ListProductsUseCase>(ListProductsUseCase);
    productRepository = module.get(PRODUCT_REPOSITORY);
  });

  it('deve retornar uma lista de produtos (caminho feliz)', async () => {
    productRepository.findAll.mockResolvedValue(mockProducts);

    const result = await useCase.execute(1, 10);

    const expectedProducts: ProductOutputGetDto[] = mockProducts.map(product => ({
      name: product.name,
      price: product.price,
      sku: product.sku,
      missingLetter: product.name === 'Produto A' ? 'b' : 'a', 
    }));

    expect(result).toEqual(expectedProducts);
    expect(productRepository.findAll).toHaveBeenCalledWith({
      skip: 0, 
      take: 10,
      orderBy: { name: 'asc' },
    });
  });

  it('deve retornar lista vazia se não houver produtos (caminho triste)', async () => {
    productRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute(1, 10);

    expect(result).toEqual([]);
    expect(productRepository.findAll).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      orderBy: { name: 'asc' },
    });
  });
});
