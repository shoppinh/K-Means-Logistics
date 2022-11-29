const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb+srv://shoppinh:maychila1@cluster0.89mv6vb.mongodb.net/K-Means");
    console.log("connect db successfully");
  } catch (err) {
    console.log("connect db fail");
  }
}

module.exports = { connect };