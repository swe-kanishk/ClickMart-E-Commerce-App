import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide blog title']
    },
    content: {
        type: String,
        required: [true, 'Please provide blog content']
    },
    images: [{
        type: String,
        required: [true, 'Please provide blog images']
    }]
}, {timestamps: true});

const BlogModel = model('Blog', blogSchema);
export default BlogModel;