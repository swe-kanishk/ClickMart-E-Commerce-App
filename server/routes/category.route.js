import { Router } from "express";
import { createCategory, getCategories, getCategoriesCount, getCategory, getSubCategoriesCount, removeCategory, removeImageFromCloudinary, updateCategory, uploadImages } from "../controllers/category.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.post('/upload-images', auth, upload.array('images'), uploadImages);
categoryRouter.post('/create', auth, createCategory);
categoryRouter.post('/get/count', getCategoriesCount);
categoryRouter.post('/get/count/subCat', getSubCategoriesCount);
categoryRouter.delete('/delete-image', auth, removeImageFromCloudinary);
categoryRouter.delete('/:id', auth, removeCategory);
categoryRouter.put('/:id', auth, updateCategory);

export default categoryRouter;