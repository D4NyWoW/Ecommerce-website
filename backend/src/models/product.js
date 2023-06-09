import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [String],
  category: {
    type: String,
    enum: ["Woman", "Men", "Kids", "Others"],
    default: "Others",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
