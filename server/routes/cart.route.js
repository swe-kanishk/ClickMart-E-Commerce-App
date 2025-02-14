import { Router } from "express";
import { addItemToCart } from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.post('/create', auth, addItemToCart);

export default cartRouter;