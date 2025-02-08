import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/connectDb.js";

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

app.get('/', (req, res) => {
    res.write("hello kanishk!")
    res.end()
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on ${PORT}`)
    })
})