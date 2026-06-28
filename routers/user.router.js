const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const AppError = require("../utils/appError");
const multer = require("multer");
const fs = require("fs");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public/images/avatars";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

const uploadUserAvatar = multer({ storage });
userRouter.post(
  "/upload",
  uploadUserAvatar.single("avatar"),
  (req, res, next) => {
    try {
      if (!req.file) {
        throw new AppError("No file uploaded", 400);
      }
      res.status(200).json({
        message: "File uploaded successfully",
        file: req.file,
      });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = userRouter;
