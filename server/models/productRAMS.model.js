import { model, Schema } from "mongoose";

const productRAMSSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const ProductRAMSModel = model('ProductRAMS', productRAMSSchema);
export default ProductRAMSModel
