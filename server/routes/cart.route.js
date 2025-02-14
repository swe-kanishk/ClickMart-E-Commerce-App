import { Router } from "express";
import { addItemToCart, deleteCartItem, getCartItem, updateCartItemQty} from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

cartRouter.get('/', auth, getCartItem);
cartRouter.post('/add', auth, addItemToCart);
cartRouter.put('/update-qty', auth, updateCartItemQty);
cartRouter.delete('/remove-item', auth, deleteCartItem);

export default cartRouter;