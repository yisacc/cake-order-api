import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const cakeSize1 = await prisma.cakeSize.create({
    data: {
      size: '100g',
      price: 1,
    },
  });

  const cakeSize2 = await prisma.cakeSize.create({
    data: {
      size: '200g',
      price: 2,
    },
  });
  const topping1 = await prisma.topping.create({
    data: {
      type: 'Fresh Strawberries',
      price: 2,
      quantity: 4,
    },
  });

  const topping2 = await prisma.topping.create({
    data: {
      type: 'White Chocolate',
      price: 3,
      quantity: 4,
    },
  });

  const topping3 = await prisma.topping.create({
    data: {
      type: 'Dark Chocolate',
      price: 2.5,
      quantity: 4,
    },
  });
  const cakeShape1 = await prisma.cakeShape.create({
    data: {
      shape: 'Square',
      price: 5,
    },
  });

  const cakeShape2 = await prisma.cakeShape.create({
    data: {
      shape: 'Round',
      price: 7,
    },
  });
  console.log({ cakeSize1, cakeSize2, topping1, topping2, topping3, cakeShape1, cakeShape2 });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })