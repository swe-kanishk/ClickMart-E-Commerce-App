import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const {productId} = req.body;

    if(!productId) {
        return res.status(402).json({
            success: false,
            error: true,
            message: 'Provide productId!'
        })
    };

    const checkCartItem = await CartProductModel.findOne({userId, productId});
    if(!checkCartItem) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Item already in cart!'
        })
    }

    const cartItem = new CartProductModel({
        quantity: 1,
        userId,
        productId
    })

    const cartProduct = await cartItem.save();
    const updateUserCart = await UserModel.updateOne({_id: userId}, {
        $push: {
            shopping_cart: productId
        }
    })

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
