import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CreateProductUseCase } from '../use-cases/product/create';
import { ListProductsUseCase } from '../use-cases/product/list';
import { GetProductUseCase } from '../use-cases/product/get';
import { UpdateProductUseCase } from '../use-cases/product/update';
import { DeleteProductUseCase } from '../use-cases/product/delete';
import { CreateProductDto, CreateProductSchema } from '../dto/product/create';
import { ApiBody } from '@nestjs/swagger';
import { CreateProductDtoDoc } from 'src/dto/doc/create';
import { UpdateProductDtoDoc } from 'src/dto/doc/update';
import { UpdateProductDto, UpdateProductSchema } from 'src/dto/product/update';
import { UseZodGuard } from 'nestjs-zod';


@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly createUseCase: CreateProductUseCase,
    private readonly listUseCase: ListProductsUseCase,
    private readonly getUseCase: GetProductUseCase,
    private readonly updateUseCase: UpdateProductUseCase,
    private readonly deleteUseCase: DeleteProductUseCase
  ) {}

  @Post()
  @ApiBody({ type: CreateProductDtoDoc })
  @UseZodGuard('body', CreateProductSchema)
  async create(@Body() createProductDto: CreateProductDto) {
    this.logger.log(
      `POST /products - Criando produto com SKU: ${createProductDto.sku}`
    );
    const result = await this.createUseCase.execute(createProductDto);
    this.logger.debug(`Produto criado: ${JSON.stringify(result)}`);
    return result;
  }

  @Get()
  async list(@Query('page') page = '1', @Query('pageSize') pageSize = '10') {
    this.logger.log(`GET /products - Página: ${page}, PageSize: ${pageSize}`);
    const pageNumber = Number(page) || 1;
    const pageSizeNumber = Number(pageSize) || 10;
    const result = await this.listUseCase.execute(pageNumber, pageSizeNumber);
    this.logger.debug(`Produtos retornados: ${result.length}`);
    return result;
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    this.logger.log(`GET /products/${id} - Buscando produto`);
    return this.getUseCase.execute(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProductDtoDoc })
  @UseZodGuard('body', UpdateProductSchema)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    this.logger.log(`PUT /products/${id} - Atualizando produto`);
    return this.updateUseCase.execute(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    this.logger.warn(`DELETE /products/${id} - Removendo produto`);
   return await this.deleteUseCase.execute(id);
  }
}
