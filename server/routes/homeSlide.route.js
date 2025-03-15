import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { addHomeSlide, deleteMultipleSlides, getHomeSlides, getSlide, removeImageFromCloudinary, removeSlide, updateSlide, uploadImages } from "../controllers/homeSlider.controller.js";

const homeSlideRouter = Router();

homeSlideRouter.get('/', getHomeSlides);
homeSlideRouter.post('/', auth, addHomeSlide);
homeSlideRouter.get('/:id', getSlide);
homeSlideRouter.post('/upload-images', auth, upload.array('images'), uploadImages);
homeSlideRouter.delete('/:id', auth, removeSlide);
homeSlideRouter.delete('/deleteMultiple', auth, deleteMultipleSlides)
homeSlideRouter.delete('/delete-image', auth, removeImageFromCloudinary);
homeSlideRouter.put('/:id', auth, updateSlide);

export default homeSlideRouter;