const express = require("express");
const stationRoutes = require("./station.router");

const rootRouter = express.Router();
rootRouter.use("/stations", stationRoutes);

module.exports = rootRouter;
