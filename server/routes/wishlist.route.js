import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToMyWishlist, deleteWishlistItem, getMyWishlists } from "../controllers/wishlist.controller.js";

const wishlistRouter = Router();

wishlistRouter.post('/', auth, addToMyWishlist)
wishlistRouter.get('/', auth, getMyWishlists)
wishlistRouter.delete('/:id', auth, deleteWishlistItem)

export default wishlistRouter;