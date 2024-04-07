import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import orderService from '../services/order.service';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

const placeOrder = catchAsync(async (req, res) => {
  const { userId, cakeShapeId, cakeSizeId, toppingIds, message } = req.body;
  const order = await orderService.createOrder(userId, cakeShapeId, cakeSizeId, toppingIds, message);
  res.status(httpStatus.CREATED).send({ order });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as User;
  const orders = await orderService.getOrders(user.id);
  res.send({ orders });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(req.params.id);
  res.send({ order });
});

const updateOrder = catchAsync(async (req, res) => {
  const { cakeShapeId, cakeSizeId, toppingIds, message } = req.body;
  const order = await orderService.updateOrder(req.params.id, cakeShapeId, cakeSizeId, toppingIds, message);
  res.send({ order });
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const calculatePrice = catchAsync(async (req, res) => {
  const { cakeShapeId, cakeSizeId, toppingIds, message } = req.body;
  const price = await orderService.calculatePrice(cakeShapeId, cakeSizeId, toppingIds, message);
  res.send({ price });
});
export default {
  placeOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  calculatePrice,
};