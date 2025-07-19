import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ProductController } from '../../controllers/product';
import { PrismaProductRepository } from '../../repositories/product/prisma-product.repository';
import { productRoutes } from '../../routes/product';
import { CreateProductUseCase } from '../../use-cases/product/create';
import { DeleteProductUseCase } from '../../use-cases/product/delete';
import { GetProductUseCase } from '../../use-cases/product/get';
import { ListProductsUseCase } from '../../use-cases/product/list';
import { UpdateProductUseCase } from '../../use-cases/product/update';



async function bootstrap() {
  const app = express();
  app.use(express.json());

  const prisma = new PrismaClient();
  const productRepository = new PrismaProductRepository(prisma);

  const createUseCase = new CreateProductUseCase(productRepository);
  const listUseCase = new ListProductsUseCase(productRepository);
  const getUseCase = new GetProductUseCase(productRepository);
  const updateUseCase = new UpdateProductUseCase(productRepository);
  const deleteUseCase = new DeleteProductUseCase(productRepository);

  const productController = new ProductController(
    createUseCase,
    listUseCase,
    getUseCase,
    updateUseCase,
    deleteUseCase
  );

  app.use('/api/products', productRoutes(productController));

  // Middleware global de erro
  app.use((err:any, req:any, res:any, next:any) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
