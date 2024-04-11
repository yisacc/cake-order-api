import { PrismaClient, Topping } from '@prisma/client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const createOrder = async (userId: string, cakeShapeId: string, cakeSizeId: string, toppingIds: string[], message: string) => {
  let data: any = {
    userId,
    cakeShapeId,
    cakeSizeId,
  };

  if (message) {
    data.message = message;
  }

  if (toppingIds && toppingIds.length > 0) {
    data.toppings = {
      connect: toppingIds.map(id => ({ id })),
    };
  }

  return await prisma.order.create({
    data,
  });
}

const getOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      cakeShape: true,
      cakeSize: true,
      toppings: true,
    },
  });
}

const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      cakeShape: true,
      cakeSize: true,
      toppings: true,
    },
  });
}

const updateOrder = async (id: string, cakeShapeId: string, cakeSizeId: string, toppingIds: string[], message: string) => {
  return await prisma.order.update({
    where: { id },
    data: {
      cakeShapeId,
      cakeSizeId,
      message,
      toppings: {
        set: toppingIds.map(id => ({ id })),
      },
    },
  });
}

const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
}

const calculatePrice = async (cakeShapeId: string, cakeSizeId: string, toppingIds: string[], message: string): Promise<number> => {
  const cakeShape = await prisma.cakeShape.findUnique({ where: { id: cakeShapeId } });
  const cakeSize = await prisma.cakeSize.findUnique({ where: { id: cakeSizeId } });
  const uniqueToppingIds = [...new Set(toppingIds)];
  let toppingsPrice: Topping[] = [];
  for (const id of uniqueToppingIds) {
    const count = toppingIds.filter(toppingId => toppingId === id).length;
    const topping = await prisma.topping.findUnique({ where: { id } });
    toppingsPrice = [...toppingsPrice, ...Array(count).fill(topping)];
  }
  if (!cakeShape || !cakeSize) {
    throw new Error('Cake shape or size not found');
  }
  let price = 0;

  price += cakeShape.price;

  price += cakeSize.price;

  toppingsPrice.forEach((topping) => {
    price += topping.price;
  });

  if (message) {
    price += 1;
  }

  return price;
}


export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  calculatePrice,
}