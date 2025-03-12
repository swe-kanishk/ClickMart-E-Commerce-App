import { model, Schema } from "mongoose";

const productWeightSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const ProductWeightModel = model('ProductWeight', productWeightSchema);
export default ProductWeightModel
