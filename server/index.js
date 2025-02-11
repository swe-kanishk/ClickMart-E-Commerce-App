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

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT || 3000;

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on ${PORT}`)
    })
})