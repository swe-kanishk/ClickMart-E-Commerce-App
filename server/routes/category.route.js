import { Router } from "express";
import { createCategory, getCategories, getCategoriesCount, getSubCategoriesCount, uploadImages } from "../controllers/category.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const categoryRouter = Router();

categoryRouter.get('/', auth, getCategories);
categoryRouter.post('/upload-images', auth, upload.array('images'), uploadImages);
categoryRouter.post('/create', auth, createCategory);
categoryRouter.post('/get/count', auth, getCategoriesCount);
categoryRouter.post('/get/count/subCat', auth, getSubCategoriesCount);

export default categoryRouter;