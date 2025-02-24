import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddress, deleteAddress, selectAddress } from "../controllers/address.controller.js";

const router = Router();

router.post('/add', auth, addAddress);
router.put('/select/:id', auth, selectAddress);
router.delete('/:id', auth, deleteAddress);

export default router;