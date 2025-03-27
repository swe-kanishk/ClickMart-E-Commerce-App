import {Schema, model} from "mongoose";

const userWishlistSchema = new Schema({
    productId: {
        type: String,
        required: [true, "Product Id required!"]
    },
    userId: {
        type: String,
        required: [true, "User Id required!"]
    },
    productTitle: {
        type: String,
        required: [true, "Product title required!"]
    },
    image: {
        type: String,
        required: [true, "Product image required!"]
    },
    rating: {
        type: Number,
        required: [true, "Product rating required!"]
    },
    price: {
        type: Number,
        required: [true, "Product price required!"]
    },
    oldPrice: {
        type: Number,
        required: [true, "Product old price required!"]
    },
    brand: {
        type: String,
        required: [true, "Product brand required!"]
    },
    discount: {
        type: Number,
        required: [true, "Product discount required!"]
    },
}, {timestamps: true});

const UserWishlistModel = model('USERWISHLIST', userWishlistSchema);
export default UserWishlistModel;