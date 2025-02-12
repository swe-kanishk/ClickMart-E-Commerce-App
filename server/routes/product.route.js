import { Router } from "express";
import { createProduct, uploadImages } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const productRouter = Router();

productRouter.post('/upload-images', auth, upload.array('images'), uploadImages)
productRouter.post('/create', auth, createProduct)

export default productRouter;     