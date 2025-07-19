import { Request, Response, NextFunction } from 'express';
import { CreateProductUseCase } from '../use-cases/product/create';
import { ListProductsUseCase } from '../use-cases/product/list';
import { GetProductUseCase } from '../use-cases/product/get';
import { UpdateProductUseCase } from '../use-cases/product/update';
import { DeleteProductUseCase } from '../use-cases/product/delete';

export class ProductController {
  constructor(
    private createUseCase: CreateProductUseCase,
    private listUseCase: ListProductsUseCase,
    private getUseCase: GetProductUseCase,
    private updateUseCase: UpdateProductUseCase,
    private deleteUseCase: DeleteProductUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.createUseCase.execute(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;

      const products = await this.listUseCase.execute(page, pageSize);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.getUseCase.execute(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedProduct = await this.updateUseCase.execute(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
