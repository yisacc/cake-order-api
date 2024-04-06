import { CakeSize } from '@prisma/client';
import prisma from '../client';

const createCakeSize = async (
  size: string,
  price: number
): Promise<CakeSize> => {

  const cakeSize = await prisma.cakeSize.findFirst({ where: { size }, select: { size: true } });
  if (cakeSize) {
    throw new Error('Cake shape already exists');
  }
  return prisma.cakeSize.create({
    data: {
      size,
      price,
    }
  });

}

const getCakeSizes = async (): Promise<CakeSize[]> => {
  return prisma.cakeSize.findMany();
}

export default { createCakeSize, getCakeSizes };