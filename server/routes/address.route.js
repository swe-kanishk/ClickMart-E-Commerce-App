import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddress } from "../controllers/address.controller.js";

const router = Router();

router.post('/add', auth, addAddress);

export default router;