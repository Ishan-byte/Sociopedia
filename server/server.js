// Pre-built imports
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { fileURLToPath } = require("url");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

// Custom Middlware
const verifyToken = require("./middlewares/verifyToken");

// Controllers
const { register } = require("./controllers/auth.controller");
const { createPost } = require("./controllers/posts.controller");

// ROUTERS
const { postsRouter, authRouter, usersRouter } = require("./routers");

// CONFIGURATIONS
// const _filename = fileURLToPath(meta.url);
// const _dirname = path.dirname(__filename);

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

// ROUTES WITH FILE UPLOAD
app.use("/auth/register", upload.single("picture"), register);
app.use("/posts/create", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// DATABASE CONNNECTION
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
  })
  .catch((err) => {
    console.log(`Server could not connect to the database`, err);
  });
