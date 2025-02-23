import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddress, selectAddress } from "../controllers/address.controller.js";

const router = Router();

router.post('/add', auth, addAddress);
router.put('/select/:id', auth, selectAddress);

export default router;