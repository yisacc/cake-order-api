import { Topping } from '@prisma/client';
import prisma from '../client';

const createTopping = async (
  type: string,
  quantity: number,
  price: number
): Promise<Topping> => {

  const cakeSize = await prisma.topping.findFirst({ where: { type }, select: { type: true } });
  if (cakeSize) {
    throw new Error('Cake shape already exists');
  }
  return prisma.topping.create({
    data: {
      type,
      quantity,
      price,
    }
  });

}

const getToppings = async (): Promise<Topping[]> => {
  return prisma.topping.findMany();
}

export default { createTopping, getToppings };