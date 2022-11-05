const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/K-Means");
    console.log("connect db successfully");
  } catch (err) {
    console.log("connect db fail");
  }
}

module.exports = { connect };