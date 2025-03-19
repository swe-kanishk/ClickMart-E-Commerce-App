import { Router } from "express";
import { addProductRam, addProductSize, addProductWeight, createProduct, deleteMultipleProducts, deleteMultipleRAMS, deleteMultipleSizes, deleteMultipleWeights, deleteProduct, deleteProductRAM, deleteProductSize, deleteProductWeight, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLevelCatId, getAllProductsByThirdLevelCatName, getFeaturedProducts, getProduct, getProductRams, getProductsCount, getProductSizes, getProductWeights, removeImageFromCloudinary, updateProduct, updateProductRAM, updateProductSize, updateProductWeight, uploadBannerImages, uploadImages } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const productRouter = Router();

productRouter.get('/', getAllProducts)
productRouter.get('/rams', getProductRams)
productRouter.get('/sizes', getProductSizes)
productRouter.get('/weights', getProductWeights)
productRouter.post('/', auth, createProduct)
productRouter.post('/uploadBannerImages', auth, upload.array('bannerImages'), uploadBannerImages)
productRouter.get('/getProductsByPrice', getAllProductsByPrice)
productRouter.get('/getProductsByRating', getAllProductsByRating)
productRouter.get('/getProductsCount', getProductsCount)
productRouter.get('/getFeaturedProducts', getFeaturedProducts)
productRouter.get('/:id', getProduct)
productRouter.put('/:id', auth, updateProduct);
productRouter.put('/rams/:id', auth, updateProductRAM);
productRouter.put('/sizes/:id', auth, updateProductSize);
productRouter.put('/weights/:id', auth, updateProductWeight);
productRouter.delete('/deleteMultiple', auth, deleteMultipleProducts)
productRouter.delete('/deleteMultiple/rams', auth, deleteMultipleRAMS)
productRouter.delete('/deleteMultiple/sizes', auth, deleteMultipleSizes)
productRouter.delete('/deleteMultiple/weights', auth, deleteMultipleWeights)
productRouter.delete('/rams/:id', auth, deleteProductRAM)
productRouter.delete('/sizes/:id', auth, deleteProductSize)
productRouter.delete('/weights/:id', auth, deleteProductWeight)
productRouter.delete('/delete-image', auth, removeImageFromCloudinary);
productRouter.delete('/:id', auth, deleteProduct)
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatId)
productRouter.get('/getAllProductsBySubCatId/:id', getAllProductsBySubCatId)
productRouter.get('/getAllProductsByThirdLevelCatId/:id', getAllProductsByThirdLevelCatId)
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName)
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatName)
productRouter.get('/getAllProductsByThirdLevelCatName', getAllProductsByThirdLevelCatName)
productRouter.post('/upload-images', auth, upload.array('images'), uploadImages)
productRouter.post('/rams', addProductRam)
productRouter.post('/weight', addProductWeight)
productRouter.post('/size', addProductSize)

export default productRouter;     