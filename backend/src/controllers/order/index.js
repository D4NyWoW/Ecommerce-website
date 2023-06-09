import User from "../../models/user";
import Order from "../../models/order";
import Boom from "boom";
import OrderSchema from "./validations";
import Product from "../../models/product.js";

const Create = async (req, res, next) => {
  const input = req.body;
  input.items = input.items ? JSON.parse(input.items) : null;
  console.log(input.items);
  const { error } = OrderSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  const { user_id } = req.payload;

  try {
    const order = new Order({
      user: user_id,
      adress: input.address,
      items: input.items,
    });

    for (let item of order.items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return next(Boom.badRequest("Product not found"));
      }
      console.log(product.stock, item.quantity);
      if (product.stock === 0) {
        return next(
          Boom.badRequest("Not enough stock for product " + product.title)
        );
      }
      if (product.stock !== 0) product.stock -= 1;
      await product.save();
    }

    const savedData = await order.save();
    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const List = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password -__v")
      .populate("items");

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    const orders = await Order.findById(user_id).populate("purchases.item");

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  List,
  GetMyOrders,
};
