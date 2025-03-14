const homeSliderSchema = new Schema({
    images: {
        type: String,
        required: true
    }
}, { timestamps: true });

const HomeSliderModel = model("HomeSlider", homeSliderSchema);
export default HomeSliderModel;