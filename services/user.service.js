const { User } = require("../models");

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

module.exports = {
  registerUser,
};
