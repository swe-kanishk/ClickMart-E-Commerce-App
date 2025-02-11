import { Router } from "express";
import { createCategory, uploadImages } from "../controllers/category.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const categoryRouter = Router();

categoryRouter.post('/upload-images', auth, upload.array('images'), uploadImages);
categoryRouter.post('/create', auth, createCategory);

export default categoryRouter;