const { Station } = require("../models");
const { Op } = require("sequelize");

const createStation = async ({ name, address, province }) => {
  const station = await Station.create({ name, address, province });
  return station;
};

const findAllStations = async () => {
  const stations = await Station.findAll();
  return stations;
};

const findFilteredStations = async (name) => {
  const stations = await Station.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
  });
  return stations;
};

const findStationById = async (id) => {
  const station = await Station.findOne({ where: { id } });
  if (!station) {
    throw new Error("Station not found");
  }
  return station;
};

const updateStation = async (id, { name, address, province }) => {
  const station = await findStationById(id);
  station.name = name;
  station.address = address;
  station.province = province;
  await station.save();
  return station;
};

const deleteStation = async (id) => {
  const station = await findStationById(id);
  await station.destroy();
};

module.exports = {
  createStation,
  findAllStations,
  findFilteredStations,
  findStationById,
  updateStation,
  deleteStation,
};
