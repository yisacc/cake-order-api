import Joi from "joi";

const createTopping = {
  body: Joi.object().keys({
    type: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  }),
};

export default {
  createTopping
};