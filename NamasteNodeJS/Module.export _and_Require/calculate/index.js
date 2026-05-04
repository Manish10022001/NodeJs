// we can group all exports in one folder and use it as export

const { calculateSum } = require("./sum");
const { calculateMultiply } = require("./multiply");

module.exports = { calculateMultiply, calculateSum };
