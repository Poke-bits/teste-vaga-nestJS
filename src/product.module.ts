import { Module } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from './constants/token';
import { ProductController } from './controllers/product';
import { PrismaProductRepository } from './repositories/product/prisma-product.repository';
import { CreateProductUseCase } from './use-cases/product/create';
import { DeleteProductUseCase } from './use-cases/product/delete';
import { GetProductUseCase } from './use-cases/product/get';
import { ListProductsUseCase } from './use-cases/product/list';
import { UpdateProductUseCase } from './use-cases/product/update';


@Module({
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    ListProductsUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,

    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductModule {}
