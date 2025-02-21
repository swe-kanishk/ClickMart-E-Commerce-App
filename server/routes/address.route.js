import { Router } from "express";
import auth from "../middlewares/auth";
import { addAddress } from "../controllers/address.controller";

const router = Router();

router.post('/', auth, addAddress);

export default router;