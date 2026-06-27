const stationService = require("../services/station.services");

const createStation = async (req, res) => {
  try {
    const { name, address, province } = req.body;
    if (!name || !address || !province) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const station = await stationService.createStation({
      name,
      address,
      province,
    });

    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStations = async (req, res) => {
  try {
    const stations = await stationService.findAllStations();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await stationService.findStationById(id);
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, province } = req.body;
    const station = await stationService.updateStation(id, {
      name,
      address,
      province,
    });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    await stationService.deleteStation(id);
    res.status(200).send("Deleted successfully!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};
