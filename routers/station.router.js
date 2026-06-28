const express = require("express");
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/station.controller");
const stationRouter = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");
const authorize = require("../middlewares/authorize.middleware");

stationRouter.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  createStation,
);
stationRouter.get("/", getAllStations);
stationRouter.get("/:id", getStationById);
stationRouter.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  updateStation,
);
stationRouter.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  deleteStation,
);

module.exports = stationRouter;
