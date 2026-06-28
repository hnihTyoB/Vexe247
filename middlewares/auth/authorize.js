const AppError = require("../../utils/appError");

const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.type)) {
      return next(
        new AppError(
          "Unauthorized: You are not allowed to perform this action",
          403,
        ),
      );
    }
    next();
  };

module.exports = authorize;
