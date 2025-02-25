import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String
    }],
    parentCatName: {
        type: String
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, {timestamps: true});

const CategoryModel = model('Category', categorySchema);
export default CategoryModel;