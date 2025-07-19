import { Router } from 'express';
import { ProductController } from '../controllers/product';

export function productRoutes(controller: ProductController) {
  const router = Router();

  router.post('/', controller.create.bind(controller));
  router.get('/', controller.list.bind(controller));
  router.get('/:id', controller.get.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
