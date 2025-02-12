import ProductModel from "../models/product.model.js";

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

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      catId,
      catName,
      brand,
      subCat,
      subCatId,
      subCatName,
      thirdSubCat,
      thirdSubCatId,
      thirdSubCatName,
      countInStock,
      rating,
      isFeatured,
      discount,
      size,
      productRam,
      weight,
    } = req.body;
    // if(!name || !description || !price || !oldPrice || !category || !catId || !catName || !subCat || !subCatId || !subCatName || !thirdSubCat || !thirdSubCatId || !thirdSubCatName || !countInStock || !rating || !isFeatured || !discount || !size || !productRam || !weight){

    // }
    const product = new ProductModel({
      name,
      description,
      images: imagesArr,
      price,
      oldPrice,
      catId,
      catName,
      subCat,
      subCatId,
      subCatName,
      brand,
      thirdSubCat,
      thirdSubCatId,
      thirdSubCatName,
      countInStock,
      rating,
      isFeatured,
      discount,
      size,
      productRam,
      weight,
    });
    await product.save();
    if (!product) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Product not created!",
      });
    }

    imagesArr = [];
    res.status(200).json({
      success: true,
      error: false,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage);
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts/perPage);

    if(page > totalPages) {
        return res.status(400).json({success: false, error: true, message: 'Page not found!'});
    }

    const products = await ProductModel.find().populate('category').skip((page-1)*perPage).limit(perPage).exec();
    if (!products) {
      return res.status(500).json({
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      data: products,
      totalPages,
      page
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
