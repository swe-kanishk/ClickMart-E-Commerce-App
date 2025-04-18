import CartProductModel from "../models/cartProduct.model.js";

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, productTitle, productRAMData, productSizeData, productWeightData, productSize, productRAM, productWeight, image, quantity, subTotal, countInStock, rating, price, oldPrice, brand, discount } = req.body;

    if (!productId || !productTitle || !image || !quantity || !subTotal || !countInStock || !rating || !price || !oldPrice || !brand || !discount) {
      return res.status(402).json({
        success: false,
        error: true,
        message: "Product all fields required!",
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
      productId, 
      productTitle, 
      image, 
      subTotal, 
      countInStock, 
      productSize, 
      productRAM, 
      productRAMData, 
      productSizeData, 
      productWeightData,
      productWeight,
      rating, 
      price, 
      oldPrice, 
      brand, 
      discount
    });

    const cartProduct = await cartItem.save();

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

    const cartItems = await CartProductModel.find({ userId });

    return res.status(200).json({
      error: false,
      success: true,
      cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity, subTotal, productRAM, productWeight, productSize } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Provide productId, Qty!",
      });
    }

    const updatedCartItem = await CartProductModel.findOneAndUpdate(
      { productId, userId },
      { quantity, subTotal, productRAM, productWeight, productSize },
      { new: true } 
    );
    


    return res.status(200).json({
      message: "Updated successfully!",
      error: false,
      success: true,
      updatedCartItem
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
    const  {id} = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Provide id!",
        error: true,
        success: false,
      });
    }

    const deleteCartItem = await CartProductModel.findByIdAndDelete(id);
    if (!deleteCartItem) {
      return res.status(404).json({
        message: "Product is not found in the cart!",
        error: true,
        success: false,
      });
    }

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
