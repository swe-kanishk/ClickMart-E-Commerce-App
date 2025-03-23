import {Router} from 'express';
import { addBanner, deleteBanner, getBanner, getBanners, removeImageFromCloudinary, updateBanner, uploadImages } from '../controllers/bannerv1.controller.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const bannerV1Router = Router();

bannerV1Router.post('/', auth, addBanner);
bannerV1Router.get('/', getBanners);
bannerV1Router.get('/:id', getBanner);
bannerV1Router.post('/uploadImages', auth, upload.array('images'), uploadImages);
bannerV1Router.delete('/deleteImage', auth, removeImageFromCloudinary);
bannerV1Router.delete('/:id', auth, deleteBanner);
bannerV1Router.put('/:id', auth, updateBanner);

export default bannerV1Router;