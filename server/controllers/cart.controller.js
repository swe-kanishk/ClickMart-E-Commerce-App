import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(402).json({
        success: false,
        error: true,
        message: "Provide productId!",
      });
    }

    const checkCartItem = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkCartItem) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Item already in cart!",
      });
    }

    const cartItem = new CartProductModel({
      quantity: 1,
      userId: userId,
      productId: productId,
    });

    const cartProduct = await cartItem.save();
    const updateUserCart = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );

    return res.status(200).json({
      message: "Added to cart successfully!",
      error: false,
      success: true,
      data: cartProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItem = await CartProductModel.find({ userId }).populate(
      "productId"
    );

    return res.status(200).json({
      error: false,
      success: true,
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItemQty = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;

    if (!_id || !qty) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Provide _id, Qty!",
      });
    }

    const updateCartItem = await CartProductModel.updateOne(
      { _id, userId },
      {
        quantity: qty,
      }
    );

    return res.status(200).json({
      message: "Updated successfully!",
      error: false,
      success: true,
      data: updateCartItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, productId } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Provide _id!",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.deleteOne({ _id, userId });
    if (!deleteCartItem) {
      return res.status(404).json({
        message: "Product is not found in the cart!",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ _id: userId });
    const userCartItems = user?.shopping_cart;

    const deletedCartItem = userCartItems.splice(
      userCartItems.indexOf(productId),
      1
    );

    await user.save();

    return res.status(200).json({
      message: "Cart item deleted successfully!",
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
