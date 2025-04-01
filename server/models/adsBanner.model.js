import { model, Schema } from "mongoose";

const adsBannerSchema = new Schema(
  {
    catId: {
      type: String,
      default: "",
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

const AdsBannerModel = model("AdsBanner", adsBannerSchema);
export default AdsBannerModel;
