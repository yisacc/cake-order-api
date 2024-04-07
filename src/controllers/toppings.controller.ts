import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import toppingService from "../services/topping.service";


const createTopping = catchAsync(async (req, res, next) => {
  const { type, quantity, price } = req.body;
  const cakeSize = await toppingService.createTopping(type, quantity, price);
  res.status(httpStatus.CREATED).send(cakeSize);
}
);

const getToppings = catchAsync(async (req, res) => {
  const cakeShapes = await toppingService.getToppings();
  res.send(cakeShapes);
});

export default { createTopping, getToppings };