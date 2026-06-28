const { User } = require("../models");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

const registerUser = async ({ name, email, password, numberPhone, type }) => {
  const user = await User.create({
    name,
    email,
    password,
    numberPhone,
    type,
  });
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Password not match", 401);
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
