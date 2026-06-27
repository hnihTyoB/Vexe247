const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const rootRouter = require("./routers/index");
const globalErrorHandler = require("./middlewares/error.middleware");
const app = express();

const port = 3000;

// cài ứng dụng sử dụng kiểu json
app.use(express.json());
// cài static file
app.use(express.static(path.join(__dirname, "./public")));
// dùng routers
app.use("/api/v1", rootRouter);
// Đăng ký middleware xử lý lỗi toàn cục
app.use(globalErrorHandler);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
