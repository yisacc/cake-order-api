import express from "express";
import toppingController from "../../controllers/toppings.controller";
import auth from "../../middlewares/auth";
import toppingValidation from "../../validations/topping.validation";
import validate from "../../middlewares/validate";


const router = express.Router();

router
  .route('/')
  .post(auth(), validate(toppingValidation.createTopping), toppingController.createTopping)
  .get(auth(), toppingController.getToppings);


export default router;

/**
 * @swagger
 * tags:
 *  name: Toppings
 *  description: Cake size management and retrieval
 */

/**
 * @swagger
 * /toppings:
 *   post:
 *     summary: Create a new topping
 *     tags: [Toppings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - quantity
 *               - price
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the cake
 *               quantity:
 *                 type: number
 *                 description: Quantity of the cake topping
 *               price:
 *                 type: number
 *                 description: Price of the cake topping
 *             example:
 *               topping: chocolate
 *               quantity: 2
 *               price: 0.8
 *     responses:
 *       "201":
 *         description: Topping was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topping'
 */

/**
 * @swagger
 * /toppings:
 *   get:
 *     summary: Get all cake toppings
 *     tags: [Toppings]
 *     responses:
 *       "200":
 *         description: List of cake toppings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topping'
 */