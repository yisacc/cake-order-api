import express from "express";
import cakeSizeController from "../../controllers/cakesSize.controller";
import auth from "../../middlewares/auth";
import cakeSizeValidation from "../../validations/cakeSize.validation";
import validate from "../../middlewares/validate";


const router = express.Router();

router
  .route('/')
  .post(auth(), validate(cakeSizeValidation.createCakeSize), cakeSizeController.createCakeSize)
  .get(auth(), cakeSizeController.getCakeSizes);


export default router;

/**
 * @swagger
 * tags:
 *  name: Cake Sizes
 *  description: Cake size management and retrieval
 */

/**
 * @swagger
 * /cake-sizes:
 *   post:
 *     summary: Create a new cake size
 *     tags: [Cake Sizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - size
 *               - price
 *             properties:
 *               size:
 *                 type: string
 *                 description: Size of the cake
 *               price:
 *                 type: number
 *                 description: Price of the cake size
 *             example:
 *               size: 400
 *               price: 0.8
 *     responses:
 *       "201":
 *         description: Cake size was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CakeSize'
 */

/**
 * @swagger
 * /cake-sizes:
 *   get:
 *     summary: Get all cake sizes
 *     tags: [Cake Sizes]
 *     responses:
 *       "200":
 *         description: List of cake sizes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CakeSize'
 */