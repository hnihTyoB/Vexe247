const { Station } = require("../models");

const createStation = async (req, res) => {
  try {
    const { name, address, province } = req.body;
    if (!name || !address || !province) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const station = await Station.create({ name, address, province });
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStation,
};
