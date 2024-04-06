import express from 'express';
import orderController from '../../controllers/order.controller';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import orderValidation from '../../validations/order.validation';


const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderValidation.placeOrder), orderController.placeOrder)
  .get(auth(), orderController.getOrders);

router
  .route('/:id')
  .get(auth(), validate(orderValidation.orderId), orderController.getOrder)
  .put(auth(), validate(orderValidation.orderId), orderController.updateOrder)
  .delete(auth(), validate(orderValidation.orderId), orderController.deleteOrder);


router.post('/price', auth(), validate(orderValidation.placeOrder), orderController.calculatePrice);


export default router;
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and retrieval
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order was placed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       204:
 *         description: The order was deleted
 */


/**
 * @swagger
 * /orders/price:
 *   post:
 *     summary: Calculate the price of a potential order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The price of the potential order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 */

