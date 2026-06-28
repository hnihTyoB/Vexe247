const express = require("express");
const stationRoutes = require("./station.router");
const userRouter = require("./user.router");

const rootRouter = express.Router();
rootRouter.use("/stations", stationRoutes);
rootRouter.use("/auth", userRouter);

module.exports = rootRouter;
