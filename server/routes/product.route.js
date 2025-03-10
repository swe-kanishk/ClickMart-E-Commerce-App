import { Router } from "express";
import { addProductRam, createProduct, deleteMultipleProducts, deleteMultipleRAMS, deleteProduct, deleteProductRAM, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLevelCatId, getAllProductsByThirdLevelCatName, getFeaturedProducts, getProduct, getProductRams, getProductsCount, removeImageFromCloudinary, updateProduct, uploadImages } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const productRouter = Router();

productRouter.get('/', getAllProducts)
productRouter.get('/rams', getProductRams)
productRouter.post('/', auth, createProduct)
productRouter.get('/:id', getProduct)
productRouter.put('/:id', auth, updateProduct);
productRouter.delete('/deleteMultiple', auth, deleteMultipleProducts)
productRouter.delete('/deleteMultiple/rams', auth, deleteMultipleRAMS)
productRouter.delete('/rams/:id', auth, deleteProductRAM)
productRouter.delete('/delete-image', auth, removeImageFromCloudinary);
productRouter.delete('/:id', auth, deleteProduct)
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatId)
productRouter.get('/getAllProductsBySubCatId/:id', getAllProductsBySubCatId)
productRouter.get('/getAllProductsByThirdLevelCatId/:id', getAllProductsByThirdLevelCatId)
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName)
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatName)
productRouter.get('/getAllProductsByThirdLevelCatName', getAllProductsByThirdLevelCatName)
productRouter.post('/upload-images', auth, upload.array('images'), uploadImages)
productRouter.get('/getProductsByPrice', getAllProductsByPrice)
productRouter.get('/getProductsByRating', getAllProductsByRating)
productRouter.get('/getProductsCount', getProductsCount)
productRouter.get('/getFeaturedProducts', getFeaturedProducts)
productRouter.post('/rams', addProductRam)

export default productRouter;     