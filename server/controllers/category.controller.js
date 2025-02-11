import CategoryModel from "../models/category.model.js";

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

export const createCategory = async (req, res) => {
  try {
    const { name, parentId, parentCatName } = req.body;

    let category = new CategoryModel({
      name,
      parentId,
      parentCatName,
      images: imagesArr,
    });

    if (!category) {
      return res.status(500).json({
        message: "Category not created!",
        error: true,
        success: false,
      });
    }

    category = await category.save();
    imagesArr = [];

    return res.status(201).json({
      message: "Category created!",
      error: false,
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = CategoryModel.find();
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = { ...cat._doc, children: [] };
    });
    const rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    return res.status(200).json({
      error: false,
      success: true,
      data: rootCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoriesCount = async (req, res) => {
  try {
    const categoriesCount = await CategoryModel.countDocuments({parentId: undefined});
    if(!categoriesCount) {
        return res.status(500).json({success: false, error: true})
    }
    return res.status(200).json({ success: true, error: false, categoriesCount});
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSubCategoriesCount = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if(!categories) {
        return res.status(500).json({success: false, error: true})
    }
    const subCatList = [];
    for(let cat of categories) {
        if(cat.parentId !== undefined) subCatList.push(cat);
    }
    return res.status(200).json({ success: true, error: false, subCategoriesCount: subCatList.length});
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
