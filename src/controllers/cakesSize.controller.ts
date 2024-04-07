import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import cakeSizeService from "../services/cakeSize.service";


const createCakeSize = catchAsync(async (req, res, next) => {
  const { size, price } = req.body;
  const cakeSize = await cakeSizeService.createCakeSize(size, price);
  res.status(httpStatus.CREATED).send(cakeSize);
}
);

const getCakeSizes = catchAsync(async (req, res) => {
  const cakeShapes = await cakeSizeService.getCakeSizes();
  res.send(cakeShapes);
});

export default { createCakeSize, getCakeSizes };