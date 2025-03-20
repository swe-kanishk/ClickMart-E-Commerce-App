import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { createBlog, deleteBlog, getBlog, getBlogs, removeImageFromCloudinary, updateBlog, uploadImages } from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get('/', getBlogs);
blogRouter.post('/', auth, createBlog);
blogRouter.get('/:id', getBlog);
blogRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
blogRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
blogRouter.delete('/:id', auth, deleteBlog);
blogRouter.put('/:id', auth, updateBlog);

export default blogRouter;