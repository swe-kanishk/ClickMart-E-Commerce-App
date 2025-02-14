import { Router } from "express";
import { addItemToCart, getCartItem } from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.get('/', auth, getCartItem);
cartRouter.post('/add', auth, addItemToCart);

export default cartRouter;