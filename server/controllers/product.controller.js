import ProductModel from "../models/product.model.js";
import ProductRAMSModel from "../models/productRAMS.model.js";
import ProductWeightModel from "../models/productWeight.model.js";
import ProductSizeModel from "../models/productSize.model.js";

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

var bannerImagesArr = [];
export const uploadBannerImages = async (req, res) => {
  try {
    bannerImagesArr = [];
    const images = req.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < images?.length; i++) {
      const img = await cloudinary.uploader
        .upload(images[i].path, options, (err, result) => {
          bannerImagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${images[i].filename}`);
          console.log(images[i].filename);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return res.status(200).json({
      images: bannerImagesArr,
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
      category,
      bannerTitle,
      bannerDescription,
      isDisplayOnHomeBanner,     
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
      bannerImages: bannerImagesArr,
      bannerTitle,
      bannerDescription,
      price,
      oldPrice,
      catId,
      catName,
      subCat,
      subCatId,
      category,
      subCatName,
      brand,
      thirdSubCat,
      thirdSubCatId,
      thirdSubCatName,
      countInStock,
      isDisplayOnHomeBanner,
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
    const images = product?.images;
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

export const deleteMultipleProducts = async (req, res) => {
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
      const product = await ProductModel.findById(ids[i]);

      if (!product) {
        return res.status(500).json({
          message: "Product not found!",
          success: false,
          error: true,
        });
      }

      const images = product?.images;
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
      await ProductModel.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        success: true,
        error: false,
        message: "Products deleted successfully!",
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

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        images: req.body.images,
        bannerImages: req.body.bannerImages,
        bannerTitle: req.body.bannerTitle,
        bannerDescription: req.body.bannerDescription,
        catId: req.body.catId,
        catName: req.body.catName,
        brand: req.body.brand,
        subCat: req.body.subCat,
        subCatId: req.body.subCatId,
        category: req.body.category,
        thirdSubCat: req.body.thirdSubCat,
        thirdSubCatId: req.body.thirdSubCatId,
        isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        size: req.body.size,
        productRam: req.body.productRam,
        weight: req.body.weight,
      },
      { new: true }
    );

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
      message: "Product updated!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const addProductRam = async (req, res) => {
  try {
    let productRam = new ProductRAMSModel({
      name: req.body.name,
    });

    productRam = await productRam.save();

    if (!productRam) {
      return res.status(500).json({
        message: "product RAM not added!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "product RAM added successfully!",
      error: false,
      success: true,
      productRam,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductRams = async (req, res) => {
  try {
    const productRams = await ProductRAMSModel.find();

    if (!productRams) {
      return res.status(500).json({
        message: "product RAM not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      productRams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteProductRAM = async (req, res) => {
  try {
    const productRam = await ProductRAMSModel.findById(req.params.id);

    if (!productRam) {
      return res.status(500).json({
        message: "Product RAM not found!",
        success: false,
        error: true,
      });
    }

    const deleteProductRAM = await ProductRAMSModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProductRAM) {
      return res.status(500).json({
        message: "Product RAM not deleted!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product RAM deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteMultipleRAMS = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid input!",
      });
    }

    try {
      await ProductRAMSModel.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        success: true,
        error: false,
        message: "Products RAMS deleted successfully!",
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

export const updateProductRAM = async (req, res) => {
  try {
    const productRAM = await ProductRAMSModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!productRAM) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product RAM cannot be updated!",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product RAM updated!",
      productRAM,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// product weight

export const addProductWeight = async (req, res) => {
  try {
    let productWeight = new ProductWeightModel({
      name: req.body.name,
    });

    productWeight = await productWeight.save();

    if (!productWeight) {
      return res.status(500).json({
        message: "product weight not added!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "product weight added successfully!",
      error: false,
      success: true,
      productWeight,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductWeights = async (req, res) => {
  try {
    const productWeights = await ProductWeightModel.find();

    if (!productWeights) {
      return res.status(500).json({
        message: "product weight not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      productWeights,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteProductWeight = async (req, res) => {
  try {
    const productWeight = await ProductWeightModel.findById(req.params.id);

    if (!productWeight) {
      return res.status(500).json({
        message: "Product weight not found!",
        success: false,
        error: true,
      });
    }

    const deleteProductWeight = await ProductWeightModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProductWeight) {
      return res.status(500).json({
        message: "Product weight not deleted!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product weight deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteMultipleWeights = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid input!",
      });
    }

    try {
      await ProductWeightModel.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        success: true,
        error: false,
        message: "Products weights deleted successfully!",
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

export const updateProductWeight = async (req, res) => {
  try {
    const productWeight = await ProductWeightModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!productWeight) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product weight cannot be updated!",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product weight updated!",
      productWeight,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// product size

export const addProductSize = async (req, res) => {
  try {
    let productSize = new ProductSizeModel({
      name: req.body.name,
    });

    productSize = await productSize.save();

    if (!productSize) {
      return res.status(500).json({
        message: "product size not added!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "product size added successfully!",
      error: false,
      success: true,
      productSize,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductSizes = async (req, res) => {
  try {
    const productSizes = await ProductSizeModel.find();

    if (!productSizes) {
      return res.status(500).json({
        message: "product sizes not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      productSizes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteProductSize = async (req, res) => {
  try {
    const productSize = await ProductSizeModel.findById(req.params.id);

    if (!productSize) {
      return res.status(500).json({
        message: "Product size not found!",
        success: false,
        error: true,
      });
    }

    const deleteProductSize = await ProductSizeModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProductSize) {
      return res.status(500).json({
        message: "Product size not deleted!",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product size deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteMultipleSizes = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid input!",
      });
    }

    try {
      await ProductSizeModel.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        success: true,
        error: false,
        message: "Products sizes deleted successfully!",
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

export const updateProductSize = async (req, res) => {
  try {
    const productSize = await ProductSizeModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!productSize) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product size cannot be updated!",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product size updated!",
      productSize,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
