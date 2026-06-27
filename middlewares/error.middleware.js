const AppError = require("../utils/appError");

// Gửi đầy đủ thông tin lỗi ở môi trường Development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Gửi thông tin lỗi đã lọc ở môi trường Production
const sendErrorProd = (err, res) => {
  // Lỗi vận hành
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Lỗi hệ thống hoặc lỗi lập trình chưa biết
    res.status(500).json({
      status: "error",
      message: "Đã có lỗi hệ thống xảy ra!",
    });
  }
};

// Xử lý lỗi Validate của Sequelize
const handleSequelizeValidationError = (err) => {
  const messages = err.errors.map((el) => el.message);
  const message = `${messages.join(". ")}`;
  return new AppError(message, 400);
};

// Xử lý lỗi trùng lặp của Sequelize
const handleSequelizeUniqueConstraintError = (err) => {
  const messages = err.errors.map((el) => `${el.path} đã tồn tại`);
  const message = `${messages.join(". ")}`;
  return new AppError(message, 400);
};

// Xử lý lỗi sai định dạng dữ liệu của Sequelize
const handleSequelizeDatabaseError = (err) => {
  return new AppError("Định dạng dữ liệu gửi lên không đúng", 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    error.stack = err.stack;
    error.isOperational = err.isOperational;

    // Map các lỗi đặc thù của Sequelize thành Operational Error
    if (err.name === "SequelizeValidationError")
      error = handleSequelizeValidationError(error);
    if (err.name === "SequelizeUniqueConstraintError")
      error = handleSequelizeUniqueConstraintError(error);
    if (err.name === "SequelizeDatabaseError")
      error = handleSequelizeDatabaseError(error);

    sendErrorProd(error, res);
  }
};
