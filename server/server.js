import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import { register } from "./controllers/auth.controller.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES

app.use("/auth/register", upload.single("picture"), register);

// DATABASE CONNNECTION
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    // strictQuery: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
  })
  .catch((err) => {
    console.log(`Server could not connect to the database`, err);
  });
