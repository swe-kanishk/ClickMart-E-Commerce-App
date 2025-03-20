import BlogModel from "../models/blog.model.js";

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

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Provide title and content!",
        error: true,
        success: false,
      });
    }

    const blog = await BlogModel.create({
      title,
      content,
      images: imagesArr,
    });
    if (!blog) {
      return res.status(500).json({
        message: "Blog not created!",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "Blog created!",
      error: false,
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    if (!blogs) {
      return res.status(400).json({
        message: "No blogs found!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req?.params?.id);
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found!",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      error: false,
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(500).json({
        message: "Blog not found!",
        success: false,
        error: true,
      });
    }
    const images = blog?.images;
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

    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(500).json({
        message: "Blog not deleted!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Blog deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        images: req.body.images,
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Blog cannot be updated!",
      });
    }

    imagesArr = [];

    return res.status(200).json({
      success: true,
      error: false,
      message: "Blog updated!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
