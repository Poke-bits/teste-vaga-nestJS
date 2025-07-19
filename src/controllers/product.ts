import { Controller, Post, Get, Put, Delete, Param, Query, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductUseCase } from '../use-cases/product/create';
import { ListProductsUseCase } from '../use-cases/product/list';
import { GetProductUseCase } from '../use-cases/product/get';
import { UpdateProductUseCase } from '../use-cases/product/update';
import { DeleteProductUseCase } from '../use-cases/product/delete';
import { CreateProductDto } from '../dto/product/create';
import { UpdateProductDto } from '../dto/product/update';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createUseCase: CreateProductUseCase,
    private readonly listUseCase: ListProductsUseCase,
    private readonly getUseCase: GetProductUseCase,
    private readonly updateUseCase: UpdateProductUseCase,
    private readonly deleteUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createUseCase.execute(createProductDto);
  }

  @Get()
  async list(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ) {
    const pageNumber = Number(page) || 1;
    const pageSizeNumber = Number(pageSize) || 10;

    return this.listUseCase.execute(pageNumber, pageSizeNumber);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateUseCase.execute(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute(id);
  }
}
