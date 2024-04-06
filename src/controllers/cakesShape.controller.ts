import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import cakeShapeService from "../services/cakeShape.service";


const createCakeShape = catchAsync(async (req, res, next) => {
  const { shape, price } = req.body;
  const cakeShape = await cakeShapeService.createCakeShape(shape, price);
  res.status(httpStatus.CREATED).send(cakeShape);
}
);

const getCakeShapes = catchAsync(async (req, res) => {
  const cakeShapes = await cakeShapeService.getCakeShapes();
  res.send(cakeShapes);
});

export default { createCakeShape, getCakeShapes };