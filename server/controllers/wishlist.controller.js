import UserWishlistModel from "../models/userWishlist.model.js";

export const addToMyWishlist = async (req, res) => {
  try {
    const {
      productId,
      productTitle,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
    } = req.body;

    if (
      !productId ||
      !productTitle ||
      !image ||
      !rating ||
      !price ||
      !oldPrice ||
      !brand ||
      !discount
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields required!",
      });
    }

    const item = await UserWishlistModel.findOne({
      userId: req?.userId,
      productId,
    });
    if (item) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "item already added im your wishlist!",
      });
    }

    let userWishlist = new UserWishlistModel({
      productId,
      productTitle,
      userId: req?.userId,
      image,
      rating,
      price,
      oldPrice,
      brand,
      discount,
    });
    userWishlist = await userWishlist.save();
    if (!userWishlist) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Product not added to your wishlist!",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Added successfully!",
      userWishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyWishlists = async (req, res) => {
  try {
    const wishlist = await UserWishlistModel.find({userId: req?.userId});
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Products not found!",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export const deleteWishlistItem = async (req, res) => {
    try {
      const userId = req.userId;
      const { id } = req.params;
        
      console.log(req.params)
      if (!id) {
        return res.status(400).json({
          message: "Provide wishlist item id!",
          error: true,
          success: false,
        });
      }
  
      const deleteWishlistItem = await UserWishlistModel.findByIdAndDelete(id);
      if (!deleteWishlistItem) {
        return res.status(404).json({
          message: "Product is not found in the wishlist!",
          error: true,
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Wishlist item deleted successfully!",
        success: true,
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
};