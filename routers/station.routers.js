const express = require("express");
const { createStation } = require("../controllers/station.controlllers");
const stationRouter = express.Router();

stationRouter.post("/", createStation);

module.exports = stationRouter;
