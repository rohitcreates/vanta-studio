import { PrismaClient } from "@prisma/client";
import { products } from "@/data/products";


const prisma = new PrismaClient();

async function main() {

  
  // Clear existing products
  await prisma.product.deleteMany();

  // Insert products
  await prisma.product.createMany({
    data: products.map((product) => ({
      ...product,
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
    })),
  });

  console.log("✅ Products seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });