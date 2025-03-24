import { model, Schema } from "mongoose";

const bannerV1Schema = new Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    catId: {
      type: String,
      default: "",
    },
    textAlignment: {
        type: String,
        default: '',
        enum: ['left', 'right']
    },
    subCatId: {
      type: String,
      default: "",
    },
    thirdLevelSubCatId: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
        required: [true, "Please provide banner images"],
      },
    ],
  },
  { timestamps: true }
);

const BannerV1Model = model("BannerV1", bannerV1Schema);
export default BannerV1Model;
