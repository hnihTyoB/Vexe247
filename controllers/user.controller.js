const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");

const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, numberPhone } = req.body;
  if (!name || !email || !password || !numberPhone) {
    throw new AppError("Missing required fields", 400);
  }
  const type = "CLIENT";
  const user = await userService.registerUser({
    name,
    email,
    password,
    numberPhone,
    type,
  });
  res.status(201).json(user);
});

module.exports = {
  registerUser,
};
