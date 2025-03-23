import BannerV1Model from "../models/bannerV1.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

var imagesArr = [];
export const uploadImages = async (req, res) => {
  try {
    imagesArr = [];
    const images = req.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < images?.length; i++) {
      const img = await cloudinary.uploader
        .upload(images[i].path, options, (err, result) => {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${images[i].filename}`);
          console.log(images[i].filename);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return res.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const removeImageFromCloudinary = async (req, res) => {
  try {
    const imgUrl = req.query.img;
    console.log(imgUrl);
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];

    if (imageName) {
      const cloudinaryRes = await cloudinary.uploader.destroy(
        imageName,
        (err, result) => {
          // console.log(err, res)
        }
      );
      if (cloudinaryRes)
        return res.status(200).json({
          success: true,
          error: false,
          message: "Image removed!",
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const addBanner = async (req, res) => {
  try {
    const banner = await BannerV1Model.create({
      title: req?.body?.title,
      price: req?.body?.price,
      catId: req?.body?.catId,
      subCatId: req?.body?.subCatId,
      thirdLevelSubCatId: req?.body?.thirdLevelSubCatId,
      images: imagesArr,
    });

    if (!banner) {
      return res.status(500).json({
        message: "Banner not added!",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Banner created!",
      error: false,
      success: true,
      banner,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await BannerV1Model.find();
    if (!banners) {
      return res.status(400).json({
        message: "No banners found!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getBanner = async (req, res) => {
    try {
      const banner = await BannerV1Model.findById(req?.params?.id);
      if (!banner) {
        return res.status(400).json({
          message: "Banner not found!",
          error: true,
          success: false,
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        banner,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  };

export const deleteBanner = async (req, res) => {
  try {
    const banner = await BannerV1Model.findById(req.params.id);

    if (!banner) {
      return res.status(500).json({
        message: "Banner not found!",
        success: false,
        error: true,
      });
    }
    const images = banner?.images;
    for (let img of images) {
      const imgUrlArr = img.split("/");
      const image = imgUrlArr[imgUrlArr.length - 1];
      const imageName = image.split(".")[0];

      if (imageName) {
        await cloudinary.uploader.destroy(imageName, (err, result) => {
          console.log(err, result);
        });
      }
    }

    const deletedBanner = await BannerV1Model.findByIdAndDelete(req.params.id);
    if (!deletedBanner) {
      return res.status(500).json({
        message: "Banner not deleted!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Bannner deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await BannerV1Model.findByIdAndUpdate(
      req.params.id,
      {
        title: req?.body?.title,
        price: req?.body?.price,
        catId: req?.body?.catId,
        subCatId: req?.body?.subCatId,
        thirdLevelSubCatId: req?.body?.thirdLevelSubCatId,
        images: req?.body?.images,
      },
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Banner cannot be updated!",
      });
    }

    imagesArr = [];

    return res.status(200).json({
      success: true,
      error: false,
      message: "Banner updated!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
