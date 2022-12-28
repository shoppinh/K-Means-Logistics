const mongoose = require("mongoose");

async function connect() {
  console.log("process.env.MONGODB_URI",process.env.MONGODB_URI)
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect db successfully");
  } catch (err) {
    console.log("connect db fail");
  }
}

module.exports = { connect };