const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_LOCAL);
    
    console.log("Connect to db successfully");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connect };
