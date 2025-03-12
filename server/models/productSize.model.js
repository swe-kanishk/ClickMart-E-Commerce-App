import { model, Schema } from "mongoose";

const productSizeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const ProductSizeModel = model('ProductSize', productSizeSchema);
export default ProductSizeModel
