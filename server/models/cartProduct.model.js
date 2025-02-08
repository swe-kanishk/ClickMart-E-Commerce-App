import mongoose, { Schema } from "mongoose";

const cartProductSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const cartProductModel = mongoose.model('cartProductSchema', cartProductSchema);
export default cartProductModel;