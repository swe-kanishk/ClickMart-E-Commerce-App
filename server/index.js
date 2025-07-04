import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/connectDb.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import homeSlideRouter from "./routes/homeSlide.route.js";
import blogRouter from "./routes/blog.route.js";
import bannerV1Router from "./routes/bannerV1.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import adsBannerRouter from "./routes/adsBanner.route.js";

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/homeSlides", homeSlideRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/bannerV1", bannerV1Router);
app.use("/api/adsBanner", adsBannerRouter);
app.use("/api/wishlist", wishlistRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });
});

// Test CI/CD for backend deployment - Run 10
