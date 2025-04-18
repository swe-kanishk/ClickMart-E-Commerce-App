import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addItemToCart, deleteCartItem, getCartItem, updateCartItem } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get('/', auth, getCartItem);
cartRouter.post('/', auth, addItemToCart);
cartRouter.put('/', auth, updateCartItem);
cartRouter.delete('/:id', auth, deleteCartItem);

export default cartRouter;