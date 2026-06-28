const express = require("express");
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/station.controller");
const authenticate = require("../middlewares/auth/authenticate");
const authorize = require("../middlewares/auth/authorize");
const stationRouter = express.Router();

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
