import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Cadeira Gamer', price: 1299.99, sku: 'CAD-GMR-001', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Teclado Mecânico RGB', price: 499.90, sku: 'TCL-RGB-002', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mouse Sem Fio', price: 199.99, sku: 'MSE-WRL-003', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monitor 27" 144Hz', price: 1799.00, sku: 'MNT-144-004', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Notebook Gamer Ryzen 7', price: 5799.00, sku: 'NTB-RYZ-005', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Headset Bluetooth', price: 299.99, sku: 'HST-BLU-006', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Webcam Full HD', price: 249.99, sku: 'WBC-FHD-007', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hub USB 3.0', price: 89.90, sku: 'HUB-USB-008', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cabo HDMI 2m', price: 29.90, sku: 'CBL-HDMI-009', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SSD NVMe 1TB', price: 499.00, sku: 'SSD-NVM-010', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fonte 650W 80 Plus', price: 399.90, sku: 'FNT-650-011', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Placa de Vídeo RTX 4060', price: 2399.00, sku: 'GPU-RTX4060', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gabinete Mid Tower', price: 299.99, sku: 'GBN-MID-013', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Controle Xbox One', price: 349.90, sku: 'CTRL-XBX-014', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Base Refrigerada para Notebook', price: 129.90, sku: 'BSR-NTB-015', createdAt: new Date(), updatedAt: new Date() },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
