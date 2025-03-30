import { model, Schema } from "mongoose";

const cartProductSchema = new Schema({
  productId: {
    type: String,
    required: [true, "Product Id required!"],
  },
  userId: {
    type: String,
    required: [true, "User Id required!"],
  },
  productTitle: {
    type: String,
    required: [true, "Product title required!"],
  },
  image: {
    type: String,
    required: [true, "Product image required!"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity required!"],
  },
  subTotal: {
    type: Number,
    required: [true, "subtotal required!"],
  },
  countInStock: {
    type: Number,
    required: [true, "Product stock count required!"],
  },
  rating: {
    type: Number,
    required: [true, "Product rating required!"],
  },
  price: {
    type: Number,
    required: [true, "Product price required!"],
  },
  oldPrice: {
    type: Number,
    required: [true, "Product old price required!"],
  },
  brand: {
    type: String,
    required: [true, "Product brand required!"],
  },
  discount: {
    type: Number,
    required: [true, "Product discount required!"],
  },
  productSize: String,
  productWeight: String,
  productRAM: String,
  }, { timestamps: true });

const CartProductModel = model("CartProduct", cartProductSchema);
export default CartProductModel;
