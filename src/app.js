import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import CookieParser from "cookieparser";

const app = express();

dotenv.config({
    path: "./.env",
});

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.json({limit: "1mb"}));
app.use(CookieParser());
app.use(express.static("public"));

export { app }