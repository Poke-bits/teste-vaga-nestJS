import { PrismaService } from "src/config/prisma.service";


describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();

    prismaService.$connect = jest.fn();
    prismaService.$disconnect = jest.fn();
  });

  it('should call $connect on module init', async () => {
    await prismaService.onModuleInit();
    expect(prismaService.$connect).toHaveBeenCalled();
  });

  it('should call $disconnect on module destroy', async () => {
    await prismaService.onModuleDestroy();
    expect(prismaService.$disconnect).toHaveBeenCalled();
  });
});
