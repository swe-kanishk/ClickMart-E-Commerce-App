import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: [true, "Provide OrderId!"],
      unique: true,
    },
    productId: {
      type: Schema.ObjectId,
      ref: "Product",
    },
    product_details: {
      name: String,
      image: Array,
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    order_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: Schema.ObjectId,
      ref: "Address",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const orderModel = model("Order", orderSchema);
export default orderModel;
