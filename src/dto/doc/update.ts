import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDtoDoc {
  @ApiPropertyOptional({
    example: 'Cadeira Gamer',
    description: 'Nome do produto',
  })
  name?: string;

  @ApiPropertyOptional({ example: 1299.99, description: 'Preço do produto' })
  price?: number;

  @ApiPropertyOptional({
    example: 'CAD-GMR-001',
    description: 'SKU do produto (apenas letras maiúsculas, números e hífens)',
  })
  sku?: string;
}
