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
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }

    const products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsByCatId = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }

    const products = await ProductModel.find({ catId: req?.params?.id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsByCatName = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }
    console.log(req.query.catName);
    const products = await ProductModel.find({ catName: req?.query?.catName })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsBySubCatId = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }
    console.log(req.query.catName);
    const products = await ProductModel.find({ subCatId: req?.params?.id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsBySubCatName = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }
    console.log(req.query.catName);
    const products = await ProductModel.find({
      subCatName: req?.query?.subCatName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsByThirdLevelCatId = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }
    console.log(req.query.catName);
    const products = await ProductModel.find({ thirdSubCatId: req?.params?.id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsByThirdLevelCatName = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }

    const products = await ProductModel.find({
      thirdSubCatName: req?.query?.subCatName,
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsByPrice = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }

    let productList = [];
    if (req.query.catId !== "" && req.query.catId !== undefined) {
      const productListArr = await ProductModel.find({
        catId: req.params.id,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
      productList = productListArr;
    }
    if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
      const productListArr = await ProductModel.find({
        subCatId: req.params.id,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
      productList = productListArr;
    }
    if (
      req.query.thirdSubCatId !== "" &&
      req.query.thirdSubCatId !== undefined
    ) {
      const productListArr = await ProductModel.find({
        thirdSubCatId: req.params.id,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
      productList = productListArr;
    }

    const filteredProducts = productList.filter((product) => {
      if (req.query.minPrice && product.price < parseInt(req.query.minPrice))
        return false;
      if (req.query.maxPrice && product.price > parseInt(req.query.maxPrice))
        return false;
      return true;
    });

    return res.status(200).json({
      success: true,
      error: false,
      data: filteredProducts,
      totalPages,
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllProductsByRating = async (req, res) => {
  try {
    const page = parseInt(req?.query?.page) || 1;
    const perPage = parseInt(req?.query.perPage) || 1000;
    const totalProducts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (page > totalPages) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Page not found!" });
    }
    let products = [];
    if (req.query.catId !== undefined) {
      products = await ProductModel.find({
        rating: req?.query?.rating,
        catId: req.query.catId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (req.query.subCatId !== undefined) {
      products = await ProductModel.find({
        rating: req?.query?.rating,
        subCatId: req.query.subCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

    if (req.query.thirdSubCatId !== undefined) {
      products = await ProductModel.find({
        rating: req?.query?.rating,
        thirdSubCatId: req.query.thirdSubCatId,
      })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
    }

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
      page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductsCount = async (req, res) => {
  try {
    const productsCount = await ProductModel.countDocuments();

    if (!productsCount) {
      return res.status(500).json({
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      productsCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await ProductModel.find({
      isFeatured: true,
    }).populate("category");

    if (!featuredProducts) {
      return res.status(500).json({
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      success: true,
      error: false,
      featuredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );

    if (!product) {
      return res.status(500).json({
        message: "Product not found!",
        success: false,
        error: true,
      });
    }
    const images = product.images;
    for (let img of images) {
      const imgUrlArr = images.split("/");
      const image = imgUrlArr[imgUrlArr.length - 1];
      const imageName = image.split(".")[0];

      if (imageName) {
        await cloudinary.uploader.destroy(imageName, (err, result) => {
          console.log(err, result);
        });
      }
    }

    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(500).json({
        message: "Product not deleted!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
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
      if (cloudinaryRes) return res.status(200).send(cloudinaryRes);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      catId: req.body.catId,
      catName: req.body.catName,
      brand: req.body.brand,
      subCat: req.body.subCat,
      subCatId: req.body.subCatId,
      category: req.body.category,
      thirdSubCat: req.body.thirdSubCat,
      thirdSubCatId: req.body.thirdSubCatId,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      discount: req.body.discount,
      size: req.body.size,
      productRam: req.body.productRam,
      weight: req.body.weight,
    }, {new: true});

    if (!product) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product cannot be updated!",
      });
    }

    imagesArr = [];

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Product is updated!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};