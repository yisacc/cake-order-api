import Joi from "joi";

const createCakeSize = {
  body: Joi.object().keys({
    size: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

export default {
  createCakeSize
};