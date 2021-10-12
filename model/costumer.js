const mongoose = require("mongoose");

// membuat schema

const Costumer = mongoose.model("costumer", {
  nama: {
    type: String,
  },
  terima: {
    type: String,
  },
  berikan: {
    type: String,
  },
});

module.exports = Costumer;
