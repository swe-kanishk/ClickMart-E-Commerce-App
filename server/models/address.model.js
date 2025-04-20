import { model, Schema } from "mongoose";

const addressSchema = new Schema(
  {
    address_line1: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    pincode: {
        type: String,
    },
    landmark: {
        type: String,
    },
    addressType: {
        type: String,
        enum: ["Home", "Office"],
        default: "Home",
    },
    country: {
        type: String,
    },
    mobile: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    selected: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.ObjectId,
    }
  },
  { timestamps: true }
);

const AddressModel = model("Address", addressSchema);
export default AddressModel;
