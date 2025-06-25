import dotenv from "dotenv";
import express, {urlencoded} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path: "./.env",
});

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(urlencoded({extended: true, limit: "1mb"}));
app.use(express.json({limit: "1mb"}));
app.use(cookieParser());
app.use(express.static("public"));


//Importing Routes
import userRoutes from "./routes/user.routes.js";
import assetRoutes from "./routes/asset.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/asset", assetRoutes);

export { app }