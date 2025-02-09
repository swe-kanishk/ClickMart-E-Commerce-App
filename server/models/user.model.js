import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Provide FirstName!"],
    },
    lastName: {
      type: String,
      required: [true, "Provide LastName!"],
    },
    email: {
      type: String,
      required: [true, "Provide Email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide Password!"],
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    access_token: {
      type: String,
      default: '',
    },
    refresh_token: {
      type: String,
      default: '',
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: Schema.ObjectId,
        ref: "Address",
      },
    ],
    shopping_cart: [
      {
        type: Schema.ObjectId,
        ref: "CartProduct",
      },
    ],
    orderHistory: [
      {
        type: Schema.ObjectId,
        ref: "Order",
      },
    ],
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
export default UserModel;
