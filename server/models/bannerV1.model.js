import {model, Schema} from 'mongoose';

const bannerV1Schema = new Schema({
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
    required: true,
  },
  subCatId: {
    type: String,
    default: "",
    required: true,
  },
  thirdLevelSubCatId: {
    type: String,
    default: "",
    required: true,
  },
  images: [{
    type: String,
    required: [true, 'Please provide banner images'],
  }],
}, {timestamps: true});

const BannerV1Model = model('BannerV1', bannerV1Schema);
export default BannerV1Model;