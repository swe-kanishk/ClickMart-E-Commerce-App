import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLevelCatId, getAllProductsByThirdLevelCatName, getFeaturedProducts, getProduct, getProductsCount, removeImageFromCloudinary, updateProduct, uploadImages } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const productRouter = Router();

productRouter.get('/', getAllProducts)
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatId)
productRouter.get('/getAllProductsBySubCatId/:id', getAllProductsBySubCatId)
productRouter.get('/getAllProductsByThirdLevelCatId/:id', getAllProductsByThirdLevelCatId)
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName)
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatName)
productRouter.get('/getAllProductsByThirdLevelCatName', getAllProductsByThirdLevelCatName)
productRouter.post('/upload-images', auth, upload.array('images'), uploadImages)
productRouter.post('/create', auth, createProduct)
productRouter.get('/getProductsByPrice', getAllProductsByPrice)
productRouter.get('/getProductsByRating', getAllProductsByRating)
productRouter.get('/getProductsCount', getProductsCount)
productRouter.get('/getFeaturedProducts', getFeaturedProducts)
productRouter.delete('/:id', auth, deleteProduct)
productRouter.get('/:id', getProduct)
productRouter.delete('/delete-image', auth, removeImageFromCloudinary);
productRouter.put('/:id', auth, updateProduct);

export default productRouter;     