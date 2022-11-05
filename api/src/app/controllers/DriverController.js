const Driver = require("../models/Driver");

const getAll = async (req, res, next) => {
  try {
    const drivers = await Driver.find({});
    return res.status(200).json(drivers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getDriverById = async (req, res, next) => {
  const { driverId } = req.value.params;
  try {
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    } else {
      return res.status(200).json(driver);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
const createDriver = async (req, res, next) => {
  const driver = new Driver(req.value.body);

  try {
    const newDriver = await driver.save();
    return res.status(200).json(newDriver);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateDriver = async (req, res, next) => {
  const { driverId } = req.value.params;
  const newDriver = req.value.body;
  try {
    const driver = await Driver.findByIdAndUpdate(driverId, newDriver);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteDriver = async (req, res, next) => {
  const { driverId } = req.value.params;
  try {
    const driver = await Driver.findByIdAndDelete(driverId);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    } else {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getDriverById,
  getAll,
  createDriver,
  updateDriver,
  deleteDriver,
};
