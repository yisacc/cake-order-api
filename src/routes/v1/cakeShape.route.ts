import express from "express";
import cakeShapeController from "../../controllers/cakesShape.controller";
import auth from "../../middlewares/auth";
import cakeShapeValidation from "../../validations/cakeShape.validation";
import validate from "../../middlewares/validate";


const router = express.Router();

router
  .route('/')
  .post(auth(), validate(cakeShapeValidation.createCakeShape), cakeShapeController.createCakeShape)
  .get(auth(), cakeShapeController.getCakeShapes);


export default router;

/**
 * @swagger
 * tags:
 *  name: Cake Shapes
 *  description: Cake shape management and retrieval
 */

/**
 * @swagger
 * /cake-shapes:
 *   post:
 *     summary: Create a new cake shape
 *     tags: [Cake Shapes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shape
 *               - price
 *             properties:
 *               shape:
 *                 type: string
 *                 description: Name of the cake shape
 *               price:
 *                 type: number
 *                 description: Price of the cake shape
 *             example:
 *               shape: round
 *               price: 0.8
 *     responses:
 *       "201":
 *         description: Cake shape was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CakeShape'
 */

/**
 * @swagger
 * /cake-shapes:
 *   get:
 *     summary: Get all cake shapes
 *     tags: [Cake Shapes]
 *     responses:
 *       "200":
 *         description: List of cake shapes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CakeShape'
 */