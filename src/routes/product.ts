import { Router } from 'express';
import { ProductController } from '../controllers/product';

import { CreateProductSchema } from '../dto/product/create';
import { UpdateProductSchema } from '../dto/product/update';
import { validateSchema } from '../../src/infra/http/middleware/validate';

export function productRoutes(controller: ProductController) {
  const router = Router();

  router.post(
    '/',
    validateSchema(CreateProductSchema),
    controller.create.bind(controller)
  );

  router.get('/', controller.list.bind(controller));
  router.get('/:id', controller.get.bind(controller));

  router.put(
    '/:id',
    validateSchema(UpdateProductSchema),
    controller.update.bind(controller)
  );

  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
