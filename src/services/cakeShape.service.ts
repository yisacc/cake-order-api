import { CakeShape } from '@prisma/client';
import prisma from '../client';

const createCakeShape = async (
  shape: string,
  price: number
): Promise<CakeShape> => {

  const cakeShape = await prisma.cakeShape.findFirst({ where: { shape }, select: { shape: true } });
  if (cakeShape) {
    throw new Error('Cake shape already exists');
  }
  return prisma.cakeShape.create({
    data: {
      shape,
      price,
    }
  });

}

const getCakeShapes = async (): Promise<CakeShape[]> => {
  return prisma.cakeShape.findMany();
}

export default { createCakeShape, getCakeShapes };