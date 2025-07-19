import { PrismaClient } from '@prisma/client';

export const prismaClientProvider = {
  provide: PrismaClient,
  useValue: new PrismaClient(),
};
