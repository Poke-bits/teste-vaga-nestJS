import { Module } from '@nestjs/common';
import { ProductModule } from './product.module';
import { PrismaModule } from './infra/prisma/prisma.module';


@Module({
  imports: [PrismaModule, ProductModule],
})
export class AppModule {}
