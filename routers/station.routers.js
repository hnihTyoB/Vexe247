const express = require("express");
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/station.controllers");
const stationRouter = express.Router();

stationRouter.post("/", createStation);
stationRouter.get("/", getAllStations);
stationRouter.get("/:id", getStationById);
stationRouter.put("/:id", updateStation);
stationRouter.delete("/:id", deleteStation);

module.exports = stationRouter;
