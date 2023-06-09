import Joi from "joi";

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.string().required(),
  photos: Joi.string(),
  stock: Joi.number().required(),
  category: Joi.string().valid("Men", "Woman", "Kids", "Others").required(),
});

export default ProductSchema;
