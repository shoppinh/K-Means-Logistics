const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect db successfully");
  } catch (err) {
    console.log("connect db fail");
  }
}

module.exports = { connect };