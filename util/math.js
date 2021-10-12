const Costumer = require("../model/costumer");
require("./db");

const a = Costumer.find().then((c) => {
  function total() {
    return c.nama;
  }
  return total;
});

console.log(a);
