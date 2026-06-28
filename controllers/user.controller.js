const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");

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
  res.status(200).json({
    message: "Login success",
  });
});

module.exports = {
  registerUser,
  loginUser,
};
