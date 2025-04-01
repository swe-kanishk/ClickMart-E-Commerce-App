import {Router} from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addAdBanner, deleteBanner, getAdBanner, getAdBanners, removeImageFromCloudinary, updateBanner, uploadImages } from '../controllers/adsBanner.controller.js';

const adsBannerRouter = Router();

adsBannerRouter.post('/', auth, addAdBanner);
adsBannerRouter.get('/', getAdBanners);
adsBannerRouter.get('/:id', getAdBanner);
adsBannerRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
adsBannerRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
adsBannerRouter.delete('/:id', auth, deleteBanner);
adsBannerRouter.put('/:id', auth, updateBanner);

export default adsBannerRouter;