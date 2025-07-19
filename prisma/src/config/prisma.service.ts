import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();

    await this.$runCommandRaw({
      createIndexes: 'Product',
      indexes: [
        {
          key: { sku: 1 },
          name: 'sku_unique_index',
          unique: true,
        },
      ],
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
