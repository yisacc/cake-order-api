import Joi from 'joi';

const placeOrder = {
  body: Joi.object().keys({
    cakeShapeId: Joi.string().required(),
    cakeSizeId: Joi.string().required(),
    toppingIds: Joi.array().min(0).items(Joi.string()),
    message: Joi.string().allow('').max(20),
  }),
};

const orderId = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default {
  placeOrder,
  orderId,
};