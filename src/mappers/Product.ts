import { Product } from '@prisma/client';
import { ProductOutputGetDto } from 'src/dto/product/get';
import { firstMissingAlphabetLetter } from 'src/utils/alphabet';


export function toProductResponse(product: Product): ProductOutputGetDto {
  return {
    name: product.name,
    price: product.price,
    sku: product.sku,
    missingLetter: firstMissingAlphabetLetter(product.name),
  };
}
