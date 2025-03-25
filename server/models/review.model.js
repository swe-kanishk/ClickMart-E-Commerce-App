import {Schema, model} from 'mongoose';

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, {timestamps: true});

const ReviewModel = model('Review', reviewSchema);
export default ReviewModel;