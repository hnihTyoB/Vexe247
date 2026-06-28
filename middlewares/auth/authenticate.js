const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized: No token provided", 401));
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new AppError("Unauthorized: Invalid token", 401));
  }
});

module.exports = authenticate;
