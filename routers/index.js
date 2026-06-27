const express = require("express");
const stationRoutes = require("./station.routers");

const rootRouter = express.Router();
rootRouter.use("/stations", stationRoutes);

module.exports = rootRouter;
