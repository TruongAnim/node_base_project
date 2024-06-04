const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connect to db successfully");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connect };
