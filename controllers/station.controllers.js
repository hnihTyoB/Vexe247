const stationService = require("../services/station.services");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createStation = catchAsync(async (req, res, next) => {
  const { name, address, province } = req.body;
  if (!name || !address || !province) {
    throw new AppError("Missing required fields", 400);
  }

  const station = await stationService.createStation({
    name,
    address,
    province,
  });

  res.status(201).json(station);
});

const getAllStations = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    const stations = await stationService.findAllStations();
    res.status(200).json(stations);
  } else {
    const stations = await stationService.findFilteredStations(name);
    res.status(200).json(stations);
  }
});

const getStationById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const station = await stationService.findStationById(id);
  res.status(200).json(station);
});

const updateStation = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, address, province } = req.body;
  const station = await stationService.updateStation(id, {
    name,
    address,
    province,
  });
  res.status(200).json(station);
});

const deleteStation = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await stationService.deleteStation(id);
  res.status(200).send("Deleted successfully!");
});

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};
