import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import HomeSliderModel from "../models/homeSlider.model.js";

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

export const addHomeSlide = async (req, res) => {
  try {
    let slide = new HomeSliderModel({
      images: imagesArr,
    });

    if (!slide) {
      return res.status(500).json({
        message: "Slide not created!",
        error: true,
        success: false,
      });
    }

    slide = await slide.save();
    imagesArr = [];

    return res.status(201).json({
      message: "Slide created!",
      error: false,
      success: true,
      slide,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getHomeSlides = async (req, res) => {
  try {
    const slides = await HomeSliderModel.find();

    if (!slides) {
      return res.status(500).json({
        message: "Slides not found!",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      error: false,
      success: true,
      slides,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSlide = async (req, res) => {
  try {
    const slide = await HomeSliderModel.findById(req?.params?.id);

    if (!slide) {
      return res.status(500).json({
        message: "Slide not found!",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      error: false,
      success: true,
      slide,
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

export const removeSlide = async (req, res) => {
  try {
    const slide = await HomeSliderModel.findById(req?.params?.id);
    if (!slide) {
      return res.status(500).json({
        success: false,
        error: true,
        message: "Slide not found!",
      });
    }
    const images = slide?.images;
    for (let img of images) {
      const urlArr = img.split("/");
      const image = urlArr[urlArr.length - 1];

      const imageName = image.split(".")[0];
      if (imageName) {
        cloudinary.uploader.destroy(imageName, (err, result) => {
          // console.log(err, result)
        });
      }
    }

    const deletedSlide = await HomeSliderModel.findByIdAndDelete(
      req?.params?.id
    );
    if (!deletedSlide) {
      return res.status(404).json({
        message: "Slide not found!",
        success: false,
        error: true,
      });
    }

    return res
      .status(200)
      .json({ success: true, error: false, message: "Slide deleted!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateSlide = async (req, res) => {
  try {
    const { images } = req.body;
    const slide = await HomeSliderModel.findByIdAndUpdate(
      req?.params?.id,
      {
        images: imagesArr.length ? imagesArr[0] : images,
      },
      { new: true }
    );

    if (!slide) {
      return res.status(500).json({
        message: "Slide cannot be updated!",
        success: false,
        error: true,
      });
    }
    imagesArr = [];
    return res.status(200).json({
      success: true,
      error: false,
      message: 'Slide updated!',
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteMultipleSlides = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid input!",
      });
    }

    for (let i = 0; i < ids.length; i++) {
      const slide = await HomeSliderModel.findById(ids[i]);

      if (!slide) {
        return res.status(500).json({
          message: "Slide not found!",
          success: false,
          error: true,
        });
      }

      const images = slide?.images;
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
    }

    try {
      await HomeSliderModel.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        success: true,
        error: false,
        message: "Slides deleted successfully!",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
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