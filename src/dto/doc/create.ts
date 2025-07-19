import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDtoDoc {
  @ApiProperty({
    example: 'Cadeira Gamer',
    description: 'Nome do produto',
  })
  name!: string;

  @ApiProperty({
    example: 1299.99,
    description: 'Preço do produto',
  })
  price!: number;

  @ApiProperty({
    example: 'CAD-GMR-001',
    description: 'SKU do produto (apenas letras maiúsculas, números e hífens)',
  })
  sku!: string;
}
