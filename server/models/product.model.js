import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Provide product name!"],
    },
    description: {
      type: String,
      required: [true, "Provide product description!"],
    },
    images: [
      {
        type: String,
        required: [true, "Provide product images!"],
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    catName: {
      type: String,
      default: "",
    },
    catId: {
      type: String,
      default: "",
    },
    subCatId: {
      type: String,
      default: "",
    },
    subCatName: {
      type: String,
      default: "",
    },
    subCatId: {
      type: String,
      default: "",
    },
    thirdSubCatId: {
      type: String,
      default: "",
    },
    thirdSubCatName: {
      type: String,
      default: "",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    countInStock: {
      type: Number,
      required: [true, "Product stock count required!"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      required: [true, "Product discount is required!"],
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    productRam: [
      {
        type: String,
        default: null,
      },
    ],
    sale: {
      type: Number,
      default: 0,
    },
    size: [
      {
        type: String,
        default: null,
      },
    ],
    weight: [
      {
        type: String,
        default: null,
      },
    ],
    bannerTitle: {
      type: String,
    },
    bannerDescription: {
      type: String,
    },
    bannerImages: [
      {
        type: String,
      },
    ],
    isDisplayOnHomeBanner: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const ProductModel = model("Product", productSchema);
export default ProductModel;
