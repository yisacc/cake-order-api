import Joi from "joi";

const createCakeShape = {
  body: Joi.object().keys({
    shape: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

export default {
  createCakeShape
};