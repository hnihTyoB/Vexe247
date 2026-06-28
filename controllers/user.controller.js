require("dotenv").config();
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, numberPhone } = req.body;
  if (!name || !email || !password || !numberPhone) {
    throw new AppError("Missing required fields", 400);
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const user = await userService.registerUser({
    name,
    email,
    password: hashPassword,
    numberPhone,
  });
  res.status(201).json(user);
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Missing required fields", 400);
  }
  const user = await userService.loginUser({ email, password });
  const token = jwt.sign(
    {
      email: user.email,
      type: user.type,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    },
  );
  res.status(200).json({
    message: "Login success",
    token,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
