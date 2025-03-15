import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { addHomeSlide, deleteMultipleSlides, getHomeSlides, getSlide, removeImageFromCloudinary, removeSlide, uploadImages } from "../controllers/homeSlider.controller.js";

const homeSlideRouter = Router();

homeSlideRouter.get('/', getHomeSlides);
homeSlideRouter.post('/', auth, addHomeSlide);
homeSlideRouter.get('/:id', getSlide);
homeSlideRouter.post('/upload-images', auth, upload.array('images'), uploadImages);
homeSlideRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
homeSlideRouter.delete('/deleteMultiple', auth, deleteMultipleSlides)
homeSlideRouter.delete('/:id', auth, removeSlide);

export default homeSlideRouter;